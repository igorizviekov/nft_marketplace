// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Using ERC721 standard
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import 'hardhat/console.sol';

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.000001 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;

    /**
        Market item object
     */
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    /**
        Event, triggered when new item created
     */
    event MerketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint256 _newListingPrice) public payable {
        require(
            owner == msg.sender,
            'Only marketplace owner can update the price'
        );
        listingPrice = _newListingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /**
        Convert image to an NFT 
    */
    function createToken(uint256 price, string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        // update count
        _tokenIds.increment();

        // new token id var
        uint256 newTokenId = _tokenIds.current();

        // create token
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        // next
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    /**
       List NFT in a marketplace
    */
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, 'Price must be greater than 0');

        // amount of eth must be equal to the transaction value
        require(
            msg.value == listingPrice,
            'Price must be euqal to Listing`s price'
        );

        // add new market item to the mapping
        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender), // address of the seller
            payable(address(this)), // address of the owner, a person who is trying to create a market item
            price,
            false // sold flag
        );

        /**
            Transfer ownership of NFT to the contract
            _transfer(from owner, to new owner, tokenId);
            address(this) - address of the current contract
        */
        _transfer(msg.sender, address(this), tokenId);

        /**
            Send notification to the contract users that the ownership of NFT has been transferred
            emit MerketItemCreated(tokenId, seller, owner, price, sold);
        */
        emit MerketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    /**
        Put item on a marketplace
    */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        /**
            Person who aiming to re-sell a token must be a token owner        
         */
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            'Only item owner can perform this operation'
        );

        // amount of eth must be equal to the transaction value
        require(
            msg.value == listingPrice,
            'Price must be euqal to Listing`s price'
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this)); // this nft marketplace

        _itemsSold.decrement();

        /**
            From sender to our marketplace
         */
        _transfer(msg.sender, address(this), tokenId);
    }

    /**
        Send item on from marketplace to a buyer
    */
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;

        // amount of eth must be equal to the transaction value
        require(
            msg.value == price,
            'Please submit the asking price to complete the purchase'
        );

        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0)); // it does not belong to any specific wallet
        idToMarketItem[tokenId].owner = payable(msg.sender); // buyer becomes an owner

        _itemsSold.increment();

        /**
            Transfer the ownership from the marketplace to the buyer
         */
        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice); // fee of the marketplace
        payable(idToMarketItem[tokenId].seller).transfer(msg.value); // transfer price of the NFT
    }
}

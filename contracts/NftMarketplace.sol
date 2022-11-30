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

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, 'Price must be greater than 0');

        // amount of eth must be equal to the transaction value
        require(
            msg.value == listingPrice,
            'Price must be euqal to Listing`s price'
        );

        // update mapping for market items
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
}

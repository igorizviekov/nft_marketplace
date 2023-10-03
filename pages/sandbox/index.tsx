import React, { useEffect, useMemo } from 'react';
import { Button } from '../../components/ui/Button';
import { toast } from 'react-toastify';
import { BigNumber, Contract, ethers } from 'ethers';
import {
  marketplaceAddress,
  collectionsAddress,
  CollectionsABI,
  MarketplaceABI,
  mockTokenURI,
  mockCollectionURI,
} from '../../mocks/constants/constants';
import axios from 'axios';
import Web3Modal from 'web3modal';

interface IListing {
  collection: string;
  tokenId: number;
  price: number;
  seller: string;
}

interface IContractMethod {
  label: string;
  action?: () => void;
}
interface ISandboxContract {
  name: string;
  instance: Contract;
  methods: IContractMethod[];
}

const ContractSandbox = () => {
  const provider = useMemo(
    () =>
      new ethers.providers.JsonRpcProvider(
        'https://json-rpc.evm.testnet.shimmer.network'
      ),
    []
  );

  const collectionContract = new ethers.Contract(
    collectionsAddress,
    CollectionsABI,
    provider
  );
  const marketplaceContract = new ethers.Contract(
    marketplaceAddress,
    MarketplaceABI,
    provider
  );

  const getErrMessage = (err: any) => err?.reason || 'Error...';

  // Collection contract methods
  const getCollection = async (id: number) => {
    try {
      const tx = await collectionContract.getCollection(id);
      const { data } = await axios.get(tx[0]);

      const collection = {
        metadata: data,
        id: Number(tx.id),
        uri: tx.uri,
        owner: tx.owner,
        mintDate: new Date(+tx.mintDate * 1000).toISOString(),
        mintPrice: ethers.utils.formatUnits(tx.mintPrice.toString(), 'ether'),
        royaltyPercent: +tx.royaltyPercent,
      };
      console.log({ collection });
      return collection;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getAllCollections = async (offset: number, limit: number) => {
    try {
      const tx = await collectionContract.getAllCollections(offset, limit);
      const collectionsData = tx.map((collection: any) => {
        return {
          id: Number(collection.id),
          uri: collection.uri,
          owner: collection.owner,
          mintDate: new Date(+collection.mintDate * 1000).toISOString(),
          mintPrice: ethers.utils.formatUnits(
            collection.mintPrice.toString(),
            'ether'
          ),
          royaltyPercent: +collection.royaltyPercent,
        };
      });
      console.log({ collectionsData });
      return collectionsData;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getCollectionsForOwner = async (
    address: string,
    offset: number,
    limit: number
  ) => {
    try {
      const tx = await collectionContract.getCollectionsForOwner(
        address,
        offset,
        limit
      );
      const collections = tx.map((collection: any) => {
        return {
          id: Number(collection.id),
          uri: collection.uri,
          owner: collection.owner,
          mintDate: new Date(+collection.mintDate * 1000).toISOString(),
          mintPrice: ethers.utils.formatUnits(
            collection.mintPrice.toString(),
            'ether'
          ),
          royaltyPercent: +collection.royaltyPercent,
        };
      });
      console.log({ collections });
      return collections;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getCollectionOfToken = async (id: number) => {
    try {
      const tx = await collectionContract.getCollectionOfToken(id);
      const { data } = await axios.get(tx[0]);

      const collection = {
        metadata: data,
        id: tx[1].toNumber(),
        owner: tx[2],
      };
      console.log(collection);
      return collection;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getNFTsInCollection = async (
    collectionId: number,
    startIndex: number,
    pageSize: number,
    isForWallet: boolean
  ) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const yourAddress = await signer.getAddress();
      const tokenIds = await collectionContract.getNFTsInCollection(
        Number(collectionId),
        Number(startIndex),
        Number(pageSize)
      );
      const listedTokenIds =
        await marketplaceContract.getListedTokensInCollection(
          collectionId,
          startIndex,
          pageSize,
          collectionContract.address
        );
      const tokenDataPromises = tokenIds.map(async (tokenId: BigNumber) => {
        const tokenURI = await collectionContract.tokenURI(tokenId);
        const listing =
          listedTokenIds &&
          listedTokenIds.length > 0 &&
          listedTokenIds
            .map((tokenId: BigNumber) => Number(tokenId))
            .includes(Number(tokenId))
            ? await marketplaceContract.getListingByTokenIdAndAddress(
                Number(tokenId),
                collectionContract.address
              )
            : null;
        const owner = await collectionContract.ownerOf(tokenId);
        if (isForWallet && owner !== yourAddress) {
          return;
        }
        const { data } = await axios.get(tokenURI);
        return {
          collection: collectionContract.address,
          collectionId: Number(collectionId),
          uri: tokenURI,
          owner: owner,
          metadata: data,
          id: +tokenId,
          listing: listing
            ? {
                tokenId: Number(listing.tokenId),
                price: ethers.utils.formatUnits(listing.price, 'ether'),
                seller: listing.seller,
                collection: listing.collection,
              }
            : null,
        };
      });

      const tokensData = (await Promise.all(tokenDataPromises)).filter(Boolean);

      console.log({ nfts: tokensData });
      return tokensData;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getCollectionOwner = async (collectionId: number) => {
    try {
      const tx = await collectionContract.getCollectionOwner(collectionId);
      console.log({ tx });
      return tx;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const mintNFT = async (
    collectionId: number,
    tokenURI: string,
    isMintToMarketplace: boolean,
    nftPrice: number | null,
    airdropAddress: string
  ) => {
    try {
      const price =
        nftPrice && !isNaN(Number(nftPrice))
          ? ethers.utils.parseUnits(nftPrice.toString(), 'ether')
          : 0;

      const collection = await getCollection(Number(collectionId));
      if (!collection) {
        return;
      }
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        collectionsAddress,
        CollectionsABI,
        signer
      );
      const tx = await contract.mint(
        collection.id,
        tokenURI,
        price,
        isMintToMarketplace,
        airdropAddress || '0x0000000000000000000000000000000000000000'
      );

      const receipt = await tx.wait();
      console.log({ receipt });

      const TokenMintedEvent = receipt.events?.find(
        (e: any) => e.event === 'TokenMinted'
      );
      console.log({ TokenMintedEvent });
      if (TokenMintedEvent) {
        const newTokenId = Number(TokenMintedEvent.args?.tokenId);
        console.log('New token ID:', newTokenId);
      } else {
        console.error('TokenMinted event not found in receipt');
      }
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const createCollection = async (
    uri: string,
    mintDate: string,
    mintPrice: number,
    royaltyPercentage: number
  ) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        collectionsAddress,
        CollectionsABI,
        signer
      );

      const collectionMintPrice = ethers.utils.parseUnits(
        mintPrice.toString(),
        'ether'
      );

      const tx = await contract.createCollection(
        uri,
        Math.floor(new Date(mintDate).getTime() / 1000),
        collectionMintPrice,
        Number(royaltyPercentage)
      );
      const receipt = await tx.wait();
      console.log({ receipt });
      // console.log({ ID: Number(receipt.args.id) });

      const CollectionCreatedEvent = receipt.events?.find(
        (e: any) => e.event === 'CollectionCreated'
      );
      console.log({ CollectionCreatedEvent });
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const changeMintPrice = async (
    collectionId: number,
    newMintPrice: number
  ) => {
    try {
      // Validate inputs
      const collection = await getCollection(Number(collectionId));
      if (!collection) {
        toast.error('Collection not found');
        return;
      }

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        collectionsAddress,
        CollectionsABI,
        signer
      );
      // Change mint price
      const newPrice = ethers.utils.parseUnits(
        newMintPrice.toString(),
        'ether'
      );

      const tx = await contract.changeMintPrice(collection.id, newPrice);
      const receipt = await tx.wait();
      const MintPriceChangedEvent = receipt.events?.find(
        (e: any) => e.event === 'MintPriceChanged'
      );
      if (MintPriceChangedEvent) {
        const collectionId = Number(MintPriceChangedEvent.args?.collectionId);

        const newPrice = ethers.utils.formatUnits(
          MintPriceChangedEvent.args?.newMintPrice,
          'ether'
        );
        console.log(
          `Mint price for collection ${collectionId} changed to ${newPrice}`
        );
      } else {
        console.error('MintPriceChanged event not found in receipt');
      }
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const royaltyInfo = async (tokenId: number, salePrice: number) => {
    try {
      const salePriceInWei = ethers.utils.parseEther(salePrice.toString());

      const { receiver, royaltyAmount } = await collectionContract.royaltyInfo(
        Number(tokenId),
        salePriceInWei
      );

      const royaltyInfo = {
        receiver,
        royaltyAmount: ethers.utils.formatUnits(royaltyAmount, 'ether'),
      };
      console.log({ royaltyInfo });
      return royaltyInfo;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  // Collection contract methods ends

  // Marketplace contract methods

  const isTokenListed = async (nftAddress: string, tokenId: number) => {
    try {
      const tx = await marketplaceContract.isTokenListed(nftAddress, tokenId);
      console.log({ tx });
      return tx;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getListedTokensInCollection = async (
    nftAddress: string,
    collectionId: number,
    isForWallet: boolean,
    startIndex: number,
    pageSize: number
  ) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const yourAddress = await signer.getAddress();
      const tokenIds = await marketplaceContract.getListedTokensInCollection(
        Number(collectionId),
        Number(startIndex),
        Number(pageSize),
        nftAddress
      );
      const tokenDataPromises = tokenIds.map(async (tokenId: BigNumber) => {
        const tokenURI = await collectionContract.tokenURI(tokenId);
        const listing = await marketplaceContract.getListingByTokenIdAndAddress(
          Number(tokenId),
          nftAddress
        );

        if (isForWallet && listing.seller !== yourAddress) {
          return;
        }
        const { data } = await axios.get(tokenURI);
        return {
          id: Number(tokenId),
          uri: tokenURI,
          metadata: data,
          listing: {
            tokenId: Number(listing.tokenId),
            price: ethers.utils.formatUnits(listing.price.toString(), 'ether'),
            seller: listing.seller,
            collection: listing.collection,
          },
        };
      });

      const tokensData = (await Promise.all(tokenDataPromises)).filter(Boolean);

      console.log({ nfts: tokensData });
      return tokensData;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const listNFT = async (
    collectionAddress: string,
    tokenId: number,
    newPrice: number
  ) => {
    try {
      // get contract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        MarketplaceABI,
        signer
      );

      const price = ethers.utils.parseUnits(newPrice.toString(), 'ether');
      const tx = await contract.listNFT(tokenId, price, collectionAddress);

      console.log('Transaction sent: ', tx.hash);
      await tx.wait();
      console.log('Transaction mined');
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const delistNFT = async (tokenId: number, nftAddress: string) => {
    try {
      // get contract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        MarketplaceABI,
        signer
      );
      const tx = await contract.delistNFT(nftAddress, tokenId);

      console.log('Transaction sent: ', tx.hash);
      await tx.wait();
      console.log('Transaction mined');
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const buyNFT = async (tokenId: number, nftAddress: string) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        MarketplaceABI,
        signer
      );
      const listing = await contract.getListingByTokenIdAndAddress(
        Number(tokenId),
        nftAddress
      );
      const transaction = await contract.buyNFT(
        listing.collection,
        +listing.tokenId,
        {
          value: listing.price,
        }
      );
      await transaction.wait();
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  async function approveMarketplaceForAll(address: string) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(address, CollectionsABI, signer);
    const tx = await nftContract.setApprovalForAll(marketplaceAddress, true);
    console.log('Transaction sent: ', tx.hash);
    await tx.wait();
    console.log('Transaction mined');
  }

  const totalReceived = async () => {
    try {
      const totalBalance = await marketplaceContract['totalReleased()']();
      console.log({ total: ethers.utils.formatEther(totalBalance) });
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const released = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        MarketplaceABI,
        signer
      );

      const yourAddress = await signer.getAddress();
      const tx = await contract['released(address)'](yourAddress);

      console.log({ amount: ethers.utils.formatEther(tx) });
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const release = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        MarketplaceABI,
        signer
      );

      const yourAddress = await signer.getAddress();
      const tx = await contract['release(address)'](yourAddress);
      const receipt = await tx.wait();
      const formatReceipt = (receipt: any) => {
        const formattedReceipt = receipt.events
          .map((e: any) => {
            if (e.event === 'PaymentReleased') {
              return {
                payee: e.args[0],
                amount: ethers.utils.formatEther(e.args[1]), // Convert from wei to ether for better readability
              };
            }
          })
          .filter((item: any) => item); // Filters out any undefined items (in case there are other events)

        return formattedReceipt;
      };

      const formattedReceipt = formatReceipt(receipt);
      console.log({ receipt: formattedReceipt });
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getAllListings = async (page: number) => {
    try {
      const listings = await marketplaceContract.getAllListings(Number(page));

      const processedListings = listings.map((listing: IListing) => ({
        tokenId: Number(listing.tokenId),
        price: ethers.utils.formatUnits(listing.price.toString(), 'ether'),
        seller: listing.seller,
        collection: listing.collection,
      }));
      console.log({ listings: processedListings });
      return processedListings;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getListingsBySeller = async (seller: string, page: number) => {
    try {
      const listings = await marketplaceContract.getListingsBySeller(
        seller,
        Number(page)
      );
      const processedListings = listings.map((listing: IListing) => ({
        tokenId: Number(listing.tokenId),
        price: ethers.utils.formatUnits(listing.price.toString(), 'ether'),
        seller: listing.seller,
        collection: listing.collection,
      }));
      console.log({ listings: processedListings });
      return processedListings;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getListingsByNFTContract = async (nftAddress: string, page: number) => {
    try {
      const listings = await marketplaceContract.getListingsByNFTContract(
        nftAddress,
        Number(page)
      );
      const processedListings = listings.map((listing: IListing) => ({
        tokenId: Number(listing.tokenId),
        price: ethers.utils.formatUnits(listing.price.toString(), 'ether'),
        seller: listing.seller,
        collection: listing.collection,
      }));
      console.log({ listings: processedListings });
      return processedListings;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getListingByTokenIdAndAddress = async (
    collectionAddress: string,
    listingTokenId: number
  ) => {
    try {
      const listing = await marketplaceContract.getListingByTokenIdAndAddress(
        Number(listingTokenId),
        collectionAddress
      );
      const { tokenId, price, seller, collection } = listing;
      const processedListing = {
        tokenId: Number(tokenId),
        price: ethers.utils.formatUnits(price.toString(), 'ether'),
        seller,
        collection,
      };
      console.log({ listing: processedListing });
      return processedListing;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const buyFromCollection = async (collectionId: number, tokenURI: string) => {
    try {
      const collection = await collectionContract.getCollection(
        Number(collectionId)
      );
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        MarketplaceABI,
        signer
      );
      const transaction = await contract.buyFromCollection(
        +collection.id,
        tokenURI,
        {
          value: collection.mintPrice,
        }
      );
      await transaction.wait();
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const pause = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        MarketplaceABI,
        signer
      );
      const transaction = await contract.pause();
      console.log({ transaction });
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const unpause = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        MarketplaceABI,
        signer
      );
      const transaction = await contract.unpause();
      console.log({ transaction });
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getPauseState = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        marketplaceAddress,
        MarketplaceABI,
        signer
      );
      const transaction = await contract.paused();
      console.log({ isPaused: transaction });
      return transaction;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };
  // Marketplace contract methods ends

  useEffect(() => {
    console.log({ collectionContract });
    console.log({ marketplaceContract });
  }, []);

  useEffect(() => {
    marketplaceContract.on('NFTSold', (tokenId, event) => {
      console.log(`NFT bought: ${tokenId}`);
    });
    return () => {
      marketplaceContract.removeAllListeners('NFTSold');
    };
  }, []);

  const contracts: ISandboxContract[] = [
    {
      name: 'collectionContract',
      instance: collectionContract,
      methods: [
        {
          label: 'getCollection',
          action: () => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            if (collectionId) {
              getCollection(+collectionId);
            }
          },
        },
        {
          label: 'getAllCollections',
          action: () => {
            const offset = window.prompt('Please enter the page offset:', '0');
            const limit = window.prompt('Please enter the page limit:', '50');
            if (offset && limit) {
              getAllCollections(+offset, +limit);
            }
          },
        },
        {
          label: 'getCollectionsForOwner',
          action: async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const yourAddress = await signer.getAddress();

            const address = window.prompt(
              'Please enter the page owner address:',
              yourAddress
            );

            const offset = window.prompt('Please enter the page offset:', '0');
            const limit = window.prompt('Please enter the page limit:', '50');
            if (address && offset && limit) {
              getCollectionsForOwner(address, +offset, +limit);
            }
          },
        },
        {
          label: 'getCollectionOfToken',
          action: () => {
            const tokenId = window.prompt('Please enter the Token ID:');
            if (tokenId) {
              getCollectionOfToken(+tokenId);
            }
          },
        },
        {
          label: 'getCollectionOwner',
          action: () => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            if (collectionId) {
              getCollectionOwner(+collectionId);
            }
          },
        },
        {
          label: 'getNFTsInCollection',
          action: () => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            const startIndex = window.prompt('Please enter the offset:', '0');
            const pageSize = window.prompt('Please enter the limit:', '50');
            const isForWallet = window.confirm(
              'isForWallet - filter NFTs by wallet'
            );
            if (collectionId && startIndex && pageSize) {
              getNFTsInCollection(
                +collectionId,
                +startIndex,
                +pageSize,
                isForWallet
              );
            }
          },
        },
        {
          label: 'createCollection',
          action: () => {
            const uri = mockCollectionURI;
            const mintDate =
              window.prompt(
                'Please enter the starting mint date:',
                new Date().toISOString()
              ) || new Date().toISOString();
            const mintPrice =
              window.prompt('Please enter the base NFT price:', '1') || '1';
            const royaltyPercentage =
              window.prompt('Please enter the royalty percentage:', '5') || '5';
            createCollection(uri, mintDate, +mintPrice, +royaltyPercentage);
          },
        },
        {
          label: 'mint',
          action: () => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            const tokenURI = window.prompt(
              'Please enter the token URI:',
              mockTokenURI
            );

            const isMintToMarketplace = window.confirm(
              'isMintToMarketplace - mint to a marketplace'
            );

            const nftPrice = isMintToMarketplace
              ? Number(window.prompt('Please enter the token price:', '50'))
              : 0;

            const airdropAddress = window.prompt(
              'If it is an airdrop, enter the recipient address:'
            );

            if (collectionId && tokenURI) {
              mintNFT(
                +collectionId,
                tokenURI,
                isMintToMarketplace,
                nftPrice,
                airdropAddress
              );
            }
          },
        },
        {
          label: 'changeMintPrice',
          action: () => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            const newMintPrice = window.prompt(
              'Please enter the new mint price:'
            );
            if (collectionId && newMintPrice) {
              changeMintPrice(+collectionId, +newMintPrice);
            }
          },
        },
        {
          label: 'royaltyInfo',
          action: () => {
            const tokenId = window.prompt('Please enter the token Id:') || '';
            const salePrice =
              window.prompt('Please enter the token sale price:') || '';
            if (tokenId && salePrice) {
              royaltyInfo(+tokenId, +salePrice);
            }
          },
        },
      ],
    },
    {
      name: 'marketplaceContract',
      instance: marketplaceContract,
      methods: [
        {
          label: 'isTokenListed',
          action: () => {
            const collectionAddress = window.prompt(
              'Please enter the collection contract address:',
              collectionsAddress
            );
            const tokenID = window.prompt('Please enter the token ID:');
            if (collectionAddress && tokenID) {
              isTokenListed(collectionAddress, +tokenID);
            }
          },
        },
        {
          label: 'getAllListings',
          action: () => {
            const page =
              window.prompt('Please enter the page number:', '1') || '1';
            getAllListings(+page);
          },
        },
        {
          label: 'getListingsBySeller',
          action: async () => {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const yourAddress = await signer.getAddress();

            const seller =
              window.prompt('Please enter the seller address:', yourAddress) ||
              yourAddress;
            const page =
              window.prompt('Please enter the page number:', '1') || '1';
            getListingsBySeller(seller, +page);
          },
        },
        {
          label: 'getListedTokensInCollection',
          action: async () => {
            const nftAddress =
              window.prompt(
                'Please enter the collection contract address:',
                collectionsAddress
              ) || collectionsAddress;
            const collectionId =
              window.prompt('Please enter the collection ID:') || '';
            const isForWallet = window.confirm(
              'isForWallet - filter NFTs by wallet'
            );
            const startIndex =
              window.prompt('Please enter the offset:', '0') || '0';
            const pageSize =
              window.prompt('Please enter the limit:', '50') || '50';
            getListedTokensInCollection(
              nftAddress,
              +collectionId,
              isForWallet,
              +startIndex,
              +pageSize
            );
          },
        },
        {
          label: 'getListingsByNFTContract',
          action: async () => {
            const nftAddress = window.prompt(
              'Please enter the collection contract address:',
              collectionsAddress
            );
            const page = window.prompt('Please enter the page number:', '1');
            if (nftAddress && page) {
              getListingsByNFTContract(nftAddress, +page);
            }
          },
        },
        {
          label: 'getListingByTokenIdAndAddress',
          action: async () => {
            const nftAddress = window.prompt(
              'Please enter the collection contract address:',
              collectionsAddress
            );
            const tokenId = window.prompt('Please enter the token ID:', '1');
            if (nftAddress && tokenId) {
              getListingByTokenIdAndAddress(nftAddress, +tokenId);
            }
          },
        },
        {
          label: 'listNFT',
          action: () => {
            const tokenId = Number(prompt('Please enter the token ID:', '1'));
            const collectionAddress = window.prompt(
              'Please enter the collection contract address:',
              collectionsAddress
            );
            const newPrice = Number(prompt('New price:'));
            if (collectionAddress) {
              listNFT(collectionAddress, +tokenId, +newPrice);
            }
          },
        },
        {
          label: 'delistNFT',
          action: () => {
            const tokenId = Number(prompt('Please enter the token ID:', '1'));
            const collectionAddress = window.prompt(
              'Please enter the collection contract address:',
              collectionsAddress
            );
            if (collectionAddress) {
              delistNFT(+tokenId, collectionAddress);
            }
          },
        },
        {
          label: 'buyNFT',
          action: () => {
            const tokenId = Number(prompt('Please enter the token ID:', '1'));
            const collectionAddress = window.prompt(
              'Please enter the collection contract address:',
              collectionsAddress
            );
            if (collectionAddress) {
              buyNFT(+tokenId, collectionAddress);
            }
          },
        },
        {
          label: 'buyFromCollection',
          action: () => {
            const collectionId =
              window.prompt('Please enter the collection ID:') || '1';
            const tokenURIPrompt = window.prompt(
              'Please enter the tokenUri:',
              mockTokenURI
            );
            if (collectionId && tokenURIPrompt) {
              buyFromCollection(+collectionId, tokenURIPrompt);
            }
          },
        },
        {
          label: 'approveMarketplaceForAll',
          action: () => {
            const collectionAddress = window.prompt(
              'Please enter the collection contract address:',
              collectionsAddress
            );
            if (collectionAddress) {
              approveMarketplaceForAll(collectionAddress);
            }
          },
        },

        {
          label: 'totalReceived',
          action: totalReceived,
        },
        {
          label: 'released',
          action: released,
        },
        {
          label: 'release',
          action: release,
        },
        {
          label: 'Pause contract',
          action: pause,
        },
        {
          label: 'Unpause contract',
          action: unpause,
        },
        {
          label: 'Get pause contract state',
          action: getPauseState,
        },
      ],
    },
  ];

  return (
    <div className="w-full ml-auto overflow-auto ">
      {contracts.map(({ name, methods }) => (
        <>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white flex left-0 sticky">
            {name}
          </h1>
          <div className="flex gap-2 mb-5">
            {methods.map(({ label, action }) => (
              <Button
                isPrimary
                label={label}
                disabled={false}
                onClick={action}
              />
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default ContractSandbox;

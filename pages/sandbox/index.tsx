import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { toast } from 'react-toastify';
import { BigNumber, ethers } from 'ethers';
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
  nftAddress: string;
  tokenId: number;
  price: number;
  seller: string;
}

const ContractSandbox = () => {
  const provider = useMemo(
    () =>
      new ethers.providers.JsonRpcProvider(
        'https://json-rpc.evm.testnet.shimmer.network'
      ),
    []
  );

  const getErrMessage = (err: any) => err?.reason || 'Error...';

  const collectionContract = useMemo(() => {
    return new ethers.Contract(collectionsAddress, CollectionsABI, provider);
  }, []);

  const marketplaceContract = useMemo(() => {
    return new ethers.Contract(marketplaceAddress, MarketplaceABI, provider);
  }, []);

  const getCollectionById = async (id: number) => {
    try {
      const tx = await collectionContract.getCollection(id);
      const { data } = await axios.get(tx[0]);

      const collection = {
        metadata: data,
        id: tx[1].toNumber(),
        owner: tx[2],
      };
      console.log({ collection });
      return collection;
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

  const getNFTsInCollection = async () => {
    const collectionId = window.prompt('Please enter the collection ID:');
    const isForWallet = window.confirm('isForWallet - filter NFTs by wallet');
    const startIndex = window.prompt('Please enter the offset:', '0');
    const pageSize = window.prompt('Please enter the limit:', '50');
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
          id: Number(tokenId),
          collection: collectionContract.address,
          collectionId: Number(collectionId),
          uri: tokenURI,
          owner: owner,
          metadata: data,
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

  const mintNFT = async () => {
    const collectionId = window.prompt('Please enter the collection ID:');
    const tokenURI = window.prompt('Please enter the token URI:', mockTokenURI);
    const royaltyPercentage = window.prompt(
      'Please enter the token royaltyPercentage:',
      '25'
    );
    const isMintToMarketplace = window.confirm(
      'isMintToMarketplace - mint to a marketplace'
    );

    const nftPrice = isMintToMarketplace
      ? window.prompt('Please enter the token price:', '50')
      : '';

    try {
      const price =
        nftPrice && !isNaN(Number(nftPrice))
          ? ethers.utils.parseUnits(nftPrice.toString(), 'ether')
          : 0;

      const collection = await getCollectionById(Number(collectionId));
      if (!collection) {
        return;
      }

      // get contract
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
        royaltyPercentage,
        isMintToMarketplace
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

  const createCollection = async () => {
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

      const tx = await contract.createCollection(
        uri,
        +mintDate,
        Number(mintPrice),
        Number(royaltyPercentage)
      );
      const receipt = await tx.wait();
      console.log({ receipt });
      // console.log({ ID: Number(receipt.args.id) });

      const CollectionCreatedEvent = receipt.events?.find(
        (e: any) => e.event === 'CollectionCreated'
      );
      console.log({ CollectionCreatedEvent });
      const collectionId = Number(CollectionCreatedEvent?.args?.[0]);
      console.log({ collectionId });
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const changeMintPrice = async () => {
    const collectionId = window.prompt('Please enter the collection ID:');
    const newMintPrice = window.prompt('Please enter the new mint price:');

    if (collectionId === null || newMintPrice === null) {
      return;
    }

    try {
      // Validate inputs
      const collection = await getCollectionById(Number(collectionId));
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
      console.log({ receipt });

      const MintPriceChangedEvent = receipt.events?.find(
        (e: any) => e.event === 'MintPriceChanged'
      );

      if (MintPriceChangedEvent) {
        const collectionId = Number(MintPriceChangedEvent.args?.collectionId);
        const newPrice = ethers.utils.formatUnits(
          MintPriceChangedEvent.args?.newPrice,
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

  const getListedTokensInCollection = async () => {
    const nftAddress =
      window.prompt(
        'Please enter the collection contract address:',
        collectionsAddress
      ) || collectionsAddress;
    const collectionId = window.prompt('Please enter the collection ID:') || '';
    const isForWallet = window.confirm('isForWallet - filter NFTs by wallet');
    const startIndex = window.prompt('Please enter the offset:', '0') || '0';
    const pageSize = window.prompt('Please enter the limit:', '50') || '50';
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
        const price = await collectionContract.getPrice(tokenId);
        const owner = await collectionContract.ownerOf(tokenId);
        if (isForWallet && owner !== yourAddress) {
          return;
        }
        const { data } = await axios.get(tokenURI);
        return {
          uri: tokenURI,
          metadata: data,
          price: ethers.utils.formatUnits(price.toString(), 'ether'),
          owner: owner,
          id: Number(tokenId),
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

  const listNFT = async () => {
    try {
      // get contract
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const tokenId = Number(prompt('Please enter the token ID:', '1'));
      const collectionAddress = window.prompt(
        'Please enter the collection contract address:',
        collectionsAddress
      );
      const newPrice = Number(prompt('New price:'));

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
      const listing = await contract.getListingByTokenIdAndAddress(
        Number(tokenId),
        nftAddress
      );
      const price = ethers.utils.parseUnits(
        Number(listing.price).toString(),
        'ether'
      );
      const transaction = await contract.buyNFT(
        listing.nftAddress,
        listing.tokenId,
        {
          value: price,
        }
      );
      await transaction.wait();
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  async function approveMarketplaceForAll() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(
      collectionsAddress,
      CollectionsABI,
      signer
    );
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

  const getRoyaltyInfo = async () => {
    const tokenId = window.prompt('Please enter the token Id:') || '';
    const salePrice = window.prompt('Please enter the token sale price:') || '';

    try {
      const salePriceInWei = ethers.utils.parseEther(salePrice);

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

  const getAllListings = async () => {
    const page = window.prompt('Please enter the page number:', '1') || '1';

    try {
      const listings = await marketplaceContract.getAllListings(Number(page));

      const processedListings = listings.map((listing: IListing) => ({
        tokenId: Number(listing.tokenId),
        price: ethers.utils.formatUnits(listing.price.toString(), 'ether'),
        seller: listing.seller,
        nftAddress: listing.nftAddress,
      }));
      console.log({ listings: processedListings });
      return processedListings;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getListingsBySeller = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const yourAddress = await signer.getAddress();

      const seller =
        window.prompt('Please enter the seller address:', yourAddress) ||
        yourAddress;
      const pagePrompt =
        window.prompt('Please enter the page number:', '1') || '1';
      const page = Number(pagePrompt) - 1;
      const pageSize =
        window.prompt('Please enter the page size number:', '50') || '50';

      const listings = await marketplaceContract.getListingsBySeller(
        seller,
        page,
        Number(pageSize)
      );
      const processedListings = listings.map((listing: IListing) => ({
        tokenId: Number(listing.tokenId),
        price: ethers.utils.formatUnits(listing.price.toString(), 'ether'),
        seller: listing.seller,
        nftAddress: listing.nftAddress,
      }));
      console.log({ listings: processedListings });
      return processedListings;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getListingsByNFTContract = async () => {
    try {
      const nftAddress =
        window.prompt(
          'Please enter the collection contract address:',
          collectionsAddress
        ) || collectionsAddress;
      const pagePrompt =
        window.prompt('Please enter the page number:', '1') || '1';
      const page = Number(pagePrompt) - 1;
      const pageSize =
        window.prompt('Please enter the page size number:', '50') || '50';

      const listings = await marketplaceContract.getListingsByNFTContract(
        nftAddress,
        page,
        Number(pageSize)
      );
      const processedListings = listings.map((listing: IListing) => ({
        tokenId: Number(listing.tokenId),
        price: ethers.utils.formatUnits(listing.price.toString(), 'ether'),
        seller: listing.seller,
        nftAddress: listing.nftAddress,
      }));
      console.log({ listings: processedListings });
      return processedListings;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getListingByTokenIdAndAddress = async () => {
    try {
      const nftAddressPrompt =
        window.prompt(
          'Please enter the collection contract address:',
          collectionsAddress
        ) || collectionsAddress;

      const tokenIdPrompt =
        window.prompt('Please enter the token ID:', '1') || '1';
      const listing = await marketplaceContract.getListingByTokenIdAndAddress(
        Number(tokenIdPrompt),
        nftAddressPrompt
      );
      const { tokenId, price, seller, nftAddress } = listing;
      const processedListing = {
        tokenId: Number(tokenId),
        price: ethers.utils.formatUnits(price.toString(), 'ether'),
        seller: seller,
        nftAddress: nftAddress,
      };
      console.log({ listing: processedListing });
      return processedListing;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const buyFromCollection = async () => {
    const collectionId =
      window.prompt('Please enter the collection ID:') || '1';
    const tokenURIPrompt =
      window.prompt('Please enter the tokenUri:', mockTokenURI) || mockTokenURI;

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

      const price = ethers.utils.parseUnits(
        Number(collection.mintPrice).toString(),
        'ether'
      );

      const transaction = await contract.buyFromCollection(
        collection.id,
        tokenURIPrompt,
        {
          value: price,
        }
      );
      await transaction.wait();
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  useEffect(() => {
    console.log({ collectionContract });
    console.log({ marketplaceContract });
  }, []);

  useEffect(() => {
    marketplaceContract.on('NFTSold', (tokenId, event) => {
      console.log(`NFT bought: ${tokenId}`);
      console.log({ event });
    });

    marketplaceContract.on('NFTDelisted', (tokenId, event) => {
      console.log('NFT delisted with token ID: ', tokenId.toString());
      console.log('Event: ', event);
    });
    marketplaceContract.on('NFTListed', (tokenId, event) => {
      console.log('NFT listed with token ID: ', tokenId.toString());
      console.log('Event: ', event);
    });
    return () => {
      marketplaceContract.removeAllListeners('NFTSold');
      marketplaceContract.removeAllListeners('NFTListed');
      marketplaceContract.removeAllListeners('NFTDelisted');
    };
  }, []);

  return (
    <div className="w-full ml-auto overflow-auto ">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white flex left-0 sticky">
        Collections
      </h1>
      <div className="flex gap-2 mb-5">
        <Button
          isPrimary
          label="createCollection"
          disabled={false}
          onClick={() => createCollection()}
        />
        <Button
          isPrimary
          label="Get public collection"
          disabled={false}
          onClick={() => getCollectionById(1)}
        />
        <Button
          isPrimary
          label="getCollection"
          disabled={false}
          onClick={() => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                getCollectionById(id);
              } else {
                toast.error('Invalid collection ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="getCollectionOfToken"
          disabled={false}
          onClick={() => {
            const tokenId = window.prompt('Please enter the Token ID:');
            if (tokenId !== null) {
              const id = Number(tokenId);
              // Call your contract function
              if (!isNaN(id)) {
                getCollectionOfToken(id);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="getNFTsInCollection"
          disabled={false}
          onClick={getNFTsInCollection}
        />
        <Button
          isPrimary
          label="getCollectionOwner"
          disabled={false}
          onClick={() => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                getCollectionOwner(id);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
        />
        <Button isPrimary label="Mint NFT" disabled={false} onClick={mintNFT} />
        <Button
          isPrimary
          label="royaltyInfo"
          disabled={false}
          onClick={getRoyaltyInfo}
        />
        <Button
          isPrimary
          label="changeMintPrice"
          disabled={false}
          onClick={changeMintPrice}
        />
      </div>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight  md:text-5xl lg:text-6xl text-white flex left-0 sticky">
        Marketplace
      </h1>

      <div className="flex gap-2 mb-5">
        <Button
          isPrimary
          label="getAllListings"
          disabled={false}
          onClick={getAllListings}
        />
        <Button
          isPrimary
          label="getListingsBySeller"
          disabled={false}
          onClick={getListingsBySeller}
        />
        <Button
          isPrimary
          label="getListingsByNFTContract"
          disabled={false}
          onClick={getListingsByNFTContract}
        />
        <Button
          isPrimary
          label="getListingByTokenIdAndAddress"
          disabled={false}
          onClick={getListingByTokenIdAndAddress}
        />
        <Button
          isPrimary
          label="approveMarketplace"
          disabled={false}
          onClick={approveMarketplaceForAll}
        />
        <Button
          isPrimary
          label="isTokenListed"
          disabled={false}
          onClick={() => {
            const tokenID = window.prompt('Please enter the token ID:');
            const nftAddress =
              window.prompt(
                'Please enter the collection contract address:',
                collectionsAddress
              ) || collectionsAddress;
            if (tokenID !== null) {
              const id = Number(tokenID);
              // Call your contract function
              if (!isNaN(id)) {
                isTokenListed(nftAddress, id);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="getListedTokensInCollection"
          disabled={false}
          onClick={getListedTokensInCollection}
        />

        <Button isPrimary label="listNFT" disabled={false} onClick={listNFT} />
        <Button
          isPrimary
          label="delistNFT"
          disabled={false}
          onClick={() => {
            const tokenID = window.prompt('Please enter the token ID:');
            const nftAddress =
              window.prompt(
                'Please enter the collection contract address:',
                collectionsAddress
              ) || collectionsAddress;
            if (tokenID !== null) {
              const id = Number(tokenID);
              // Call your contract function
              if (!isNaN(id)) {
                delistNFT(id, nftAddress);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
        />

        <Button
          isPrimary
          label="buyNFT"
          disabled={false}
          onClick={() => {
            const tokenId = Number(prompt('Enter token ID:'));
            const nftAddress =
              window.prompt(
                'Please enter the collection contract address:',
                collectionsAddress
              ) || collectionsAddress;
            buyNFT(tokenId, nftAddress);
          }}
        />
        <Button
          isPrimary
          label="buyFromCollection"
          disabled={false}
          onClick={buyFromCollection}
        />
        <Button
          isPrimary
          label="total released amount"
          disabled={false}
          onClick={totalReceived}
        />
        <Button
          isPrimary
          label="your released amount"
          disabled={false}
          onClick={released}
        />
        <Button
          isPrimary
          label="release funds"
          disabled={false}
          onClick={release}
        />
      </div>
    </div>
  );
};

export default ContractSandbox;

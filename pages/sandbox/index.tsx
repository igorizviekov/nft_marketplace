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

const ContractSandbox = () => {
  const [requests, setRequests] = useState([]);

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

  const getNFTsInCollection = async (
    collectionId: number,
    startIndex: number,
    pageSize: number
  ) => {
    try {
      const tokenIds = await collectionContract.getNFTsInCollection(
        collectionId,
        startIndex,
        pageSize
      );

      const tokenDataPromises = tokenIds.map(async (tokenId: BigNumber) => {
        const tokenURI = await collectionContract.tokenURI(tokenId);
        const price = await collectionContract.getPrice(tokenId);
        const owner = await collectionContract.ownerOf(tokenId);
        const { data } = await axios.get(tokenURI);
        return {
          uri: tokenURI,
          metadata: data,
          price: ethers.utils.formatUnits(price.toString(), 'ether'),
          owner: owner,
          id: Number(tokenId),
        };
      });

      const tokensData = await Promise.all(tokenDataPromises);

      console.log({ nfts: tokensData });
      return tokensData;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const getPrice = async (tokenId: number) => {
    try {
      const tx = await collectionContract.getPrice(tokenId);
      const tokenPrice = ethers.utils.formatEther(tx);
      console.log({ tokenPrice });
      return tokenPrice;
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

  const mintNFT = async (collectionId: number, tokenURI = mockTokenURI) => {
    try {
      // get a collection where to mint
      const collection = await getCollectionById(collectionId);
      if (!collection) {
        return;
      }
      const nftPrice = 1;

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
      const price = ethers.utils.parseUnits(nftPrice.toString(), 'ether');

      // mint
      const tx = await contract.mint(collection.id, tokenURI, price);
      const receipt = await tx.wait();
      console.log({ receipt });

      const TokenMintedEvent = receipt.events?.find(
        (e: any) => e.event === 'TokenMinted'
      );
      console.log({ TokenMintedEvent });
      if (TokenMintedEvent) {
        const newTokenId = TokenMintedEvent.args?.tokenId;
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

  const createCollection = async (uri: string) => {
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

      const tx = await contract.createCollection(uri);
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

  const setPrice = async (tokenId: number, newPrice: number) => {
    try {
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
      const price = ethers.utils.parseUnits(newPrice.toString(), 'ether');

      const tx = await contract.setPrice(tokenId, price);
      const receipt = await tx.wait();
      console.log({ receipt });

      const PriceSetEvent = receipt.events?.find(
        (e: any) => e.event === 'PriceSet'
      );
      console.log({ PriceSetEvent });
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const setMarketplace = async () => {
    try {
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
      const tx = await contract.setMarketplace(
        '0xc0Bb1650A8eA5dDF81998f17B5319afD656f4c11'
      );
      const receipt = await tx.wait();
      console.log({ receipt });
    } catch (err) {
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const isTokenListed = async (tokenId: number) => {
    try {
      const tx = await marketplaceContract.isTokenListed(tokenId);
      console.log({ tx });
      return tx;
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const listNFT = async (tokenId: number, newPrice: number) => {
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

      const tx = await contract.listNFT(tokenId, price);

      console.log('Transaction sent: ', tx.hash);
      await tx.wait();
      console.log('Transaction mined');
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const delistNFT = async (tokenId: number) => {
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
      const tx = await contract.delistNFT(tokenId);

      console.log('Transaction sent: ', tx.hash);
      await tx.wait();
      console.log('Transaction mined');
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const approveMintRequest = async (requestId: number) => {
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
      const transaction = await contract.approveMintRequest(requestId);
      await transaction.wait();
    } catch (err) {
      console.log({ err });
      const message = getErrMessage(err);
      toast.error(message);
    }
  };

  const buyNFT = async (
    tokenId: number,
    collectionId: number,
    tokenURI: string
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

      let price;
      if (tokenId) {
        const tokenPrice = (await getPrice(tokenId)) || '';
        price = ethers.utils.parseUnits(tokenPrice.toString(), 'ether');
        const transaction = await contract.buyNFT(tokenId, 0, '', {
          value: price,
        });
        await transaction.wait();
      } else {
        price = ethers.utils.parseUnits('6.0', 'ether');
        const transaction = await contract.buyNFT(
          tokenId,
          collectionId,
          tokenURI,
          {
            value: price,
          }
        );
        await transaction.wait();
        console.log({ transaction });
      }
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

  useEffect(() => {
    console.log({ collectionContract });
    console.log({ marketplaceContract });
    // approveMarketplaceForAll();
  }, []);

  useEffect(() => {
    marketplaceContract.on('NFTBought', (tokenId, event) => {
      console.log(`NFT bought: ${tokenId}`);
      console.log({ event });
    });
    marketplaceContract.on(
      'TokenMintRequest',
      (mintRequestId, buyer, tokenURI, price, event) => {
        console.log(
          `Mint request: ${mintRequestId} by ${buyer} for ${tokenURI} at ${price}`
        );
        console.log({ event });
      }
    );
    marketplaceContract.on('NFTDelisted', (tokenId, event) => {
      console.log('NFT delisted with token ID: ', tokenId.toString());
      console.log('Event: ', event);
    });
    marketplaceContract.on('NFTListed', (tokenId, event) => {
      console.log('NFT listed with token ID: ', tokenId.toString());
      console.log('Event: ', event);
    });
    return () => {
      marketplaceContract.removeAllListeners('NFTBought');
      marketplaceContract.removeAllListeners('NFTListed');
      marketplaceContract.removeAllListeners('TokenMintRequest');
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
          onClick={() => createCollection(mockCollectionURI)}
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
          onClick={() => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                getNFTsInCollection(id, 0, 100);
              } else {
                toast.error('Invalid collection ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="getPrice"
          disabled={false}
          onClick={() => {
            const collectionId = window.prompt('Please enter the token ID:');
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                getPrice(id);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="setPrice"
          disabled={false}
          onClick={() => {
            const collectionId = window.prompt('Please enter the token ID:');
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                setPrice(id, 5);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
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
        <Button
          isPrimary
          label="Mint NFT"
          disabled={false}
          onClick={() => {
            const collectionId = window.prompt(
              'Please enter the collection ID:'
            );
            if (collectionId !== null) {
              const id = Number(collectionId);
              // Call your contract function
              if (!isNaN(id)) {
                mintNFT(id);
              } else {
                toast.error('Invalid collection ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="setMarketplace"
          disabled={false}
          onClick={setMarketplace}
        />
      </div>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight  md:text-5xl lg:text-6xl text-white flex left-0 sticky">
        Marketplace
      </h1>
      <div className="flex gap-2 mb-5">
        <Button
          isPrimary
          label="isTokenListed"
          disabled={false}
          onClick={() => {
            const tokenID = window.prompt('Please enter the token ID:');
            if (tokenID !== null) {
              const id = Number(tokenID);
              // Call your contract function
              if (!isNaN(id)) {
                isTokenListed(id);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="listNFT"
          disabled={false}
          onClick={() => {
            const tokenID = window.prompt('Please enter the token ID:');
            if (tokenID !== null) {
              const id = Number(tokenID);
              // Call your contract function
              if (!isNaN(id)) {
                const price = Number(prompt('New price:'));
                listNFT(id, price);
              } else {
                toast.error('Invalid token ID. Please try again.');
              }
            }
          }}
        />
        <Button
          isPrimary
          label="delistNFT"
          disabled={false}
          onClick={() => {
            const tokenID = window.prompt('Please enter the token ID:');
            if (tokenID !== null) {
              const id = Number(tokenID);
              // Call your contract function
              if (!isNaN(id)) {
                delistNFT(id);
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
            const collectionId = Number(prompt('Enter collection ID:'));
            const tokenURI = prompt('Enter token URI:');
            buyNFT(tokenId, collectionId, tokenURI || '');
          }}
        />
        <Button
          isPrimary
          label="approveMintRequest"
          disabled={false}
          onClick={() => {
            const reqId = Number(prompt('Enter request ID:'));
            approveMintRequest(reqId);
          }}
        />
      </div>
    </div>
  );
};

export default ContractSandbox;

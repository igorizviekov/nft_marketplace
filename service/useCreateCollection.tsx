import axios from 'axios';
import { GeneralInformation } from '../store/model/create-collection/collection.types';
import { NetworkInformation } from '../store/model/create-collection/collection.types';
import { Royalty } from '../store/model/create-collection/collection.types';
import { toast } from 'react-toastify';
import { useIPFSImageUpload } from './useIPFSImageUpload';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { CollectionsABI, collectionsAddress } from '../mocks/constants.mock';
export async function useCreateCollection({
  generalInformation,
  networkInformation,
  royalties,
  isCollectionCreated,
  handleModalClose,
}: ICreateCollection) {
  const token = localStorage.getItem('token');

  isCollectionCreated(false);

  const ipfsImagePath =
    generalInformation.file &&
    (await useIPFSImageUpload(generalInformation.file));

  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    collectionsAddress,
    CollectionsABI,
    signer
  );

  const collectionURI = JSON.stringify({
    name: generalInformation.name,
    description: generalInformation.description,
    image: ipfsImagePath,
    website: generalInformation.website ? generalInformation.website : '',
    category_primary: networkInformation.categoryPrimary,
    category_secondary: networkInformation.categorySecondary,
    symbol: networkInformation.symbol,
    network: networkInformation.network,
    royalties: royalties,
  });

  const tx = await contract.createCollection(collectionURI);
  const receipt = await tx.wait();
  console.log({ receipt });

  const CollectionCreatedEvent = receipt.events?.find(
    (e: any) => e.event === 'CollectionCreated'
  );
  const collectionID = Number(CollectionCreatedEvent.args?.[0]);

  console.log({ collectionID });

  axios
    .post(
      'https://nft-api-production-4aa1.up.railway.app/collection',
      {
        image: ipfsImagePath,
        name: generalInformation.name,
        description: generalInformation.description,
        blockchain_id: networkInformation.network.id,
        website: generalInformation.website ? generalInformation.website : '',
        symbol: networkInformation.symbol,
        categoryPrimary: networkInformation.categoryPrimary,
        categorySecondary: networkInformation.categorySecondary,
        tokenId: collectionID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 201) {
        isCollectionCreated(true);
        handleModalClose();
        toast.success('Collection created successfully');
      }
    })
    .catch((error) => console.error(error));
}

interface ICreateCollection {
  generalInformation: GeneralInformation;
  networkInformation: NetworkInformation;
  royalties: Royalty[];
  isCollectionCreated: (isCreated: boolean) => void;
  handleModalClose: () => void;
}

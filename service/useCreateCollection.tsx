import axios from 'axios';
import { GeneralInformation } from '../store/model/create-collection/collection.types';
import { NetworkInformation } from '../store/model/create-collection/collection.types';
import { Royalty } from '../store/model/create-collection/collection.types';
import { toast } from 'react-toastify';

export async function useCreateCollection({
  generalInformation,
  networkInformation,
  royalties,
  isCollectionCreated,
  handleModalClose,
}: ICreateCollection) {
  const token = localStorage.getItem('token');
  //is creating collection
  isCollectionCreated(false);
  axios
    .post(
      'https://nft-api-production-3c8d.up.railway.app/collection',
      {
        //@TODO upload image to ipfs
        name: generalInformation.name,
        image:
          'https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FUh4mcnLwpIp3GqAkpfXRZA%2Fnormalized.jpg&width=800',
        blockchain_id: 'f09b46f6-5287-4a4a-b36a-c3fac11d963e',
        description: generalInformation.description,
        symbol: networkInformation.symbol,
        categoryPrimary: networkInformation.categorySecondary.toLowerCase(),
        categorySecondary: networkInformation.categorySecondary.toLowerCase(),

        //@todo add royalties once the db schema is changed
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

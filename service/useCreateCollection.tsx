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

  const ipfsImagePath =
    generalInformation.file &&
    (await useIPFSImageUpload(generalInformation.file));
  isCollectionCreated(false);

  console.log(networkInformation.categoryPrimary)
  console.log(networkInformation.categorySecondary)
  axios
    .post(
      'https://nft-api-production-4aa1.up.railway.app/collection',
      {
        image: ipfsImagePath,
        name: generalInformation.name,
        description: generalInformation.description,
        blockchain_id: networkInformation.network.id,
        symbol: networkInformation.symbol,
        categoryPrimary: networkInformation.categoryPrimary,
        categorySecondary: networkInformation.categorySecondary,

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

import axios from 'axios';
import { GeneralInformation } from '../store/model/create-collection/collection.types';
import { NetworkInformation } from '../store/model/create-collection/collection.types';
import { Royalty } from '../store/model/create-collection/collection.types';

export async function useCreateCollection({
  generalInformation,
  networkInformation,
  royalties,
}: ICreateCollection) {
  const thumb = URL.createObjectURL(generalInformation.file as Blob);

  axios
    .post('https://nft-api-production-3c8d.up.railway.app/collection', {
      name: generalInformation.name,
      symbol: networkInformation.symbol,
      blockchain_id: 'f09b46f6-5287-4a4a-b36a-c3fac11d963e',
      categoryPrimary: networkInformation.mainCategory.toLowerCase(),
      categorySecondary: networkInformation.subCategory.toLowerCase(),
      description: generalInformation.description,
      website: generalInformation.website,
      image: thumb,
      royalties: royalties[0]?.percentage,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

interface ICreateCollection {
  generalInformation: GeneralInformation;
  networkInformation: NetworkInformation;
  royalties: Royalty[];
}

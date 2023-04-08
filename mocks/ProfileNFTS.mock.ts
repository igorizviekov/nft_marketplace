import { TEST_IMAGE_URL } from "../components/ui/Base/BaseImage/BaseImage";
import { INftCardProps } from "../components/ui/nft-card";

export const MockNFTS: INftCardProps[] = [
  {
    name: 'Mock NFT',
    seller: 'Johanna',
    owner: 'Johanna',
    description: 'Description of the NFT',
    img: TEST_IMAGE_URL,
    price: 8,
    tokenId: 12093012,
    status: 'Owned',
  },
];

import { ethers } from "ethers";
import { INftCardProps } from "../components/ui/NFTCard/NFTCard.types";
import { fetchContract } from "../utils";
import axios from "axios";

export const useFetchNFTs = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_ALCHEMY_API_URL
  );
  const contract = fetchContract(provider);
  /**
   * List of all available NFTs on marketplace.
   * Filtered by "not sold"
   */
  const data = await contract.getActiveCocktails();

  /**
   * Map data to the format, which will used on frontend
   */
  const items = await Promise.all(
    data.map(async ({ tokenId, seller, owner, price }: INftCardProps) => {
      const formattedPrice = ethers.utils.formatUnits(
        price.toString(),
        'ether'
      );
      const tokenURI: string = await contract.tokenURI(tokenId);

      // get NFT metadata and image
      const {
        data: { image, name, description, nickname, avatar },
      } = await axios.get(tokenURI);

      return {
        price: formattedPrice,
        tokenId: Number(tokenId),
        img: image,
        seller,
        owner,
        name,
        description,
        nickname,
        avatar,
      };
    })
  );
  return items;
};
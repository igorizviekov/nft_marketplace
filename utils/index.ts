import { ethers } from 'ethers';
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers';
import { MarketAddress, MarketAddressABI } from '../context/constants';
import { INftCardProps } from '../components/ui/NFTCard/NFTCard.types';
import { ActiveSelectOption } from '../components/SortBy/SortBy.types';

export const randomId = (length: number): string => {
  let res = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz123456789';
  for (let i = 0; i < length; i++) {
    return (res += chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return res;
};

/**
 * If mode is active will display a popup to connect a wallet
 */
export type ConnectWallet = 'silent' | 'active';
interface IConnectWallet {
  isConnected: boolean;
  account: any | null;
}

export const connectWallet = async (
  mode: ConnectWallet
): Promise<IConnectWallet> => {
  const accounts = await window.ethereum
    .request({
      method: mode === 'silent' ? 'eth_accounts' : 'eth_requestAccounts',
    })
    .then((result: Response) => {
      return result;
    });

  if (accounts.length) {
    return {
      isConnected: true,
      account: accounts[0],
    };
  } else {
    return {
      isConnected: false,
      account: null,
    };
  }
};

/**
 * Connect to the smart contract
 */
export const fetchContract = (signer: JsonRpcSigner | JsonRpcProvider) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signer);

export const sortNfts = (type: ActiveSelectOption, nfts: INftCardProps[]) => {
  switch (type) {
    case 'Price (low to high)':
      return nfts.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case 'Price (high to low)':
      return nfts.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    case 'Recently added':
      return nfts.sort((a, b) => Number(b.tokenId) - Number(a.tokenId));
      break;
    default:
      return nfts;
      break;
  }
};

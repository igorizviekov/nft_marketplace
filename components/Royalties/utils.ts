import { useStoreState } from '../../store';
import { Royalty } from '../../store/model/collection/collection.types';

export function isWalletValid(
  wallet: string,
  royaltyAddresses: Royalty[]
): string {
  const walletRegex = /^0x[0-9a-fA-F]{40}$/;


  if (walletRegex.test(wallet)) {
    const isDuplicate = royaltyAddresses.some(
      (address) => address.walletAddress === wallet
    );
    if (isDuplicate) return 'Duplicated wallet';
    return '';
  }
  return 'The address you entered is not Valid';
}

export function validatePercentage(price: number): string {
  if (price < 0) return "Price can't be negative";
  else return '';
}

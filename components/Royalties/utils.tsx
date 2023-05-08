import { useEffect, useState } from 'react';
import { Royalty } from '../../store/model/collection/collection.types';

export function isWalletValid(
  wallet: string,
  royalties: Royalty[],
  setFormError: (hasError: boolean) => void
): string {
  const walletRegex = /^0x[0-9a-fA-F]{40}$/;
  const [message, setMessage] = useState<string>('');
  const isDuplicate = royalties.some(
    (royalty) => royalty.walletAddress === wallet
  );

  useEffect(() => {
    if (walletRegex.test(wallet)) {
      if (isDuplicate) {
        setMessage('Duplicated wallet');
        setFormError(true);
      } else {
        setMessage('');
        setFormError(false);
      }
    } else if (wallet === '') {
      setFormError(false);
      setMessage('');
    } else {
      setFormError(true);
      setMessage('The address you entered is not Valid');
    }
  }, [wallet, royalties]);

  return message;
}

export function validatePercentage(
  price: number,
  setFormError: (hasError: boolean) => void
): string {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (price <= 0) {
      setMessage("Can't zero or less");
      setFormError(true);
    } else if (price === undefined) {
      setMessage('');
      setFormError(false);
    }
  }, [price]);

  return message;
}

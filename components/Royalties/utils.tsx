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
      setFormError(true);
      setMessage('');
    } else {
      setFormError(true);
      setMessage('The address you entered is not Valid');
    }
  }, [wallet, royalties]);

  return message;
}

export function validatePercentage(
  percentage: number,
  setFormError: (hasError: boolean) => void
): string {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (percentage <= 0) {
      setMessage("Can't be zero or less");
      setFormError(true);
    } else if (percentage === undefined) {
      setMessage('');
      setFormError(true);
    }else{
      setFormError(false)
      setMessage('')
    }
  }, [percentage]);

  return message;
}

import { useEffect, useState } from 'react';
import { useStoreActions } from '../../../store';

export function validateName(name: string): string {
  const [message, setMessage] = useState<string>('');
  const { setFormError } = useStoreActions((actions) => actions.nftMint);
  useEffect(() => {
    if (name.length > 100) {
      setMessage('Name cannot be longer that 100 characters');
      setFormError(true);
    } else {
      setMessage('');
      setFormError(false);
    }
  }, [name]);
  return message;
}

export function validateDescription(description: string): string {
  const [message, setMessage] = useState<string>('');
  const { setFormError } = useStoreActions((actions) => actions.nftMint);
  useEffect(() => {
    if (description.length > 500) {
      setMessage('Description cannot be longer that 500 characters');
      setFormError(true);
    } else {
      setFormError(false);
      setMessage('');
    }
  }, [description]);

  return message;
}

export function validatePrice(price: number): string {
  const [message, setMessage] = useState<string>('');
  const { setFormError } = useStoreActions((actions) => actions.nftMint);
  useEffect(() => {
    if (price < 0) {
      setMessage("Price can't be negative");
      setFormError(true);
    } else {
      setMessage('');
      setFormError(false);
    }
  }, [price]);

  return message;
}

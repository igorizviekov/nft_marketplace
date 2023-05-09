import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store';

export function validateName(
  name: string,
  description: string,
  price: number
): string {
  const [message, setMessage] = useState<string>('');
  const { setFormError } = useStoreActions((actions) => actions.nftMint);
  useEffect(() => {
    if (name.length > 100) {
      setMessage('Name cannot be longer that 100 characters');
      setFormError(true);
    } else if (!Boolean(name)) {
      setMessage('');
      setFormError(true);
    } else if (name && description && price) {
      setFormError(false);
      setMessage('');
    }
  }, [name]);
  return message;
}

export function validateDescription(
  description: string,
  name: string,
  price: number
): string {
  const [message, setMessage] = useState<string>('');
  const { setFormError } = useStoreActions((actions) => actions.nftMint);
  useEffect(() => {
    if (description.length > 500) {
      setMessage('Description cannot be longer that 500 characters');
      setFormError(true);
    } else if (!Boolean(description)) {
      setMessage('');
      setFormError(true);
    } else if (name && price && description) {
      setFormError(false);
      setMessage('');
    }
  }, [description]);

  return message;
}

export function validatePrice(
  price: number,
  name: string,
  description: string
): string {
  const [message, setMessage] = useState<string>('');
  const { setFormError } = useStoreActions((actions) => actions.nftMint);
  useEffect(() => {
    if (price < 0) {
      setMessage("Price can't be negative");
      setFormError(true);
    } else if (price && name && description) {
      setMessage('');
      setFormError(false);
    }
  }, [price]);

  return message;
}

import { useEffect, useState } from 'react';
import { useStoreActions } from '../../store';

export function validateName(name: string): string {
  const [message, setMessage] = useState<string>('');
  const { setGralInfoFormError } = useStoreActions(
    (actions) => actions.collection
  );

  useEffect(() => {
    if (name.length > 100) {
      setGralInfoFormError(true);
      setMessage('Name cannot be longer that 100 characters');
    } else setMessage('');
  }, [name]);

  return message;
}

export function validateDescription(description: string): string {
  const [message, setMessage] = useState<string>('');
  const { setGralInfoFormError } = useStoreActions(
    (actions) => actions.collection
  );

  useEffect(() => {
    if (description.length > 500) {
      setGralInfoFormError(true);
      setMessage('Description cannot be longer that 500 characters');
    } else setMessage('');
  }, [description]);

  return message;
}
export function validateWebsite(website?: string): string {
  const [message, setMessage] = useState<string>('');
  const { setGralInfoFormError } = useStoreActions(
    (actions) => actions.collection
  );
  const websiteRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,63}(:[0-9]{1,5})?(\/.*)?$/;

  useEffect(() => {
    const isValid = website && websiteRegex.test(website);
    if (isValid) setMessage('');
    else if (website === '') setMessage('');
    else if (!isValid) {
      console.log(isValid);
      setGralInfoFormError(true);
      setMessage('Invalid Website');
    }
  }, [website]);

  return message;
}

export function validateSymbol(symbol: string): string {
  const symbolRegex = /^[A-Z0-9]{2,10}$/;
  const setFormError = useStoreActions(
    (actions) => actions.collection.setNetworkInformationError
  );
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (symbolRegex.test(symbol)) {
      setMessage('');
    } else if (symbol === '') {
      setMessage('');
      setFormError(true);
    } else {
      setFormError(true);
      setMessage('Invalid Symbol');
    }
  }, [symbol]);

  return message;
}

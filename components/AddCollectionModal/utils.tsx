import { useEffect, useState } from 'react';
import { useStoreActions } from '../../store';
import { INetworkInformationInput } from './AddCollectionModal.types';
import { NetworkInformation } from '../../store/model/create-collection/collection.types';

export function validateName(name: string): string {
  const [message, setMessage] = useState<string>('');
  const { setGralInfoFormError } = useStoreActions(
    (actions) => actions.createCollection
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
    (actions) => actions.createCollection
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
    (actions) => actions.createCollection
  );
  const websiteRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,63}(:[0-9]{1,5})?(\/.*)?$/;

  useEffect(() => {
    const isValid = website && websiteRegex.test(website);
    if (isValid) setMessage('');
    else if (website === '') setMessage('');
    else if (!isValid) {
      setGralInfoFormError(true);
      setMessage('Invalid Website');
    }
  }, [website]);

  return message;
}

export function validateSymbol(symbol: string): string {
  const symbolRegex = /^[A-Z0-9]{2,10}$/;
  const setFormError = useStoreActions(
    (actions) => actions.createCollection.setNetworkInformationError
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

export function excludeEmptyKeys(obj: any): Object {
  const newObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (value !== null && value !== undefined && value !== '') {
        newObj[key] = value;
      }
    }
  }
  return newObj;
}

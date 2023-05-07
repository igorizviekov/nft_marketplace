import { useEffect, useState } from 'react';
import { useStoreActions, useStoreDispatch } from '../../store';

export function validateName(name: string): string {
  const [message, setMessage] = useState<string>('');
  const setFormError = useStoreActions(
    (actions) => actions.collection.setGeneralInformationFormError
  );

  useEffect(() => {
    if (name.length > 100) {
      setFormError(true);
      setMessage('Name cannot be longer that 100 characters');
    } else setMessage('');
  }, [name]);

  return message;
}

export function validateDescription(description: string): string {
  const [message, setMessage] = useState<string>('');
  const setFormError = useStoreActions(
    (actions) => actions.collection.setGeneralInformationFormError
  );

  useEffect(() => {
    if (description.length > 500) {
      setFormError(true);
      setMessage('Description cannot be longer that 500 characters');
    } else setMessage('');
  }, [description]);

  return message;
}
export function validateWebsite(website?: string): string {
  const [message, setMessage] = useState<string>('');
  const setFormError = useStoreActions(
    (actions) => actions.collection.setGeneralInformationFormError
  );
  const websiteRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,63}(:[0-9]{1,5})?(\/.*)?$/;

  useEffect(() => {
    if (website && websiteRegex.test(website)) setMessage('');
    else if (website === '') setMessage('');
    else {
      setFormError(true);
      setMessage('Invalid Website');
    }
  }, []);
  
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

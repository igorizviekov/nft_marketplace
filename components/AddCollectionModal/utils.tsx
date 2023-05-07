import { useStoreActions } from '../../store';

export function validateName(name: string): string {
  const setFormError = useStoreActions(
    (actions) => actions.collection.setGeneralInformationFormError
  );
  if (name.length > 100) {
    setFormError(true);
    return 'Name cannot be longer that 100 characters';
  } else return '';
}

export function validateDescription(description: string): string {
  const setFormError = useStoreActions(
    (actions) => actions.collection.setGeneralInformationFormError
  );
  if (description.length > 500) {
    setFormError(true);
    return 'Description cannot be longer that 500 characters';
  } else return '';
}
export function validateWebsite(website?: string): string {
  const setFormError = useStoreActions(
    (actions) => actions.collection.setGeneralInformationFormError
  );
  const websiteRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,63}(:[0-9]{1,5})?(\/.*)?$/;

  if (website && websiteRegex.test(website)) return '';
  else if (website === '') return '';
  else {
    setFormError(true);
    return 'Invalid Website';
  }
}

export function validateSymbol(symbol: string) {
  const symbolRegex = /^[A-Z0-9]{2,10}$/;

  if (symbolRegex.test(symbol)) return '';
  return 'Invalid Symbol';
}

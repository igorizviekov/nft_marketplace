export function validateName(name: string): string {
  if (name.length > 100) return 'Name cannot be longer that 100 characters';
  else return '';
}

export function validateDescription(description: string): string {
  if (description.length > 500)
    return 'Description cannot be longer that 500 characters';
  else return '';
}
export function validateWebsite(website: string): string {
  const websiteRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,63}(:[0-9]{1,5})?(\/.*)?$/;

  if (website && websiteRegex.test(website)) return '';
  return 'Enter a valid website';
}

export function validateName(name: string): string {
  if (name.length > 100) return 'Name cannot be longer that 100 characters';
  else return '';
}

export function validateDescription(description: string): string {
  if (description.length > 500)
    return 'Description cannot be longer that 500 characters';
  else return '';
}

export function validatePrice(price: number): string {
  if (price < 0) return "Price can't be negative";
  else return '';
}

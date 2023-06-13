export interface IDropdownMenuItem {
  label: string;
  icon: JSX.Element;
  href?: string;
  isNotLink?: boolean;
  onClick?: () => void;
  className?: string;
}

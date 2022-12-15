export interface IModalProps {
  header: string;
  footer: JSX.Element | JSX.Element[];
  body: JSX.Element | JSX.Element[];
  onClose: () => void;
}

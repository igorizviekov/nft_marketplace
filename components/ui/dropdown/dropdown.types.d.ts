export interface IDropdownProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  /**
   * The label string displayed on top of the input field
   */
  heading?: string;

  /**
   * Options of the input
   */
  options: string[];

  /**
   * Selected option
   */
  checked: number;

  /**
   * Input change handler
   */
  onChange: (option: number) => void;
  /**
   *
   */
  openModal: () => void;
}

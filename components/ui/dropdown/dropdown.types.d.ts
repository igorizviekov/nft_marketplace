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
   * Input change handler
   */
  onChange: React.ChangeEventHandler;
  /**
   *
   */
  openModal: () => void;
}

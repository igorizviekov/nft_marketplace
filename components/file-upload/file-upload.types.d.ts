import { DropzoneOptions } from 'react-dropzone/typings/react-dropzone';

export interface IFileUploadProps extends DropzoneOptions {
  /**
   * Uploaded file
   */
  file: File | null;

  /**
   * Description text for drag and drop box
   */
  description?: string;

  /**
   * Handler for replacing/removing uploaded files
   */
  onUploadAbort: () => void;

  /**
   * The label string displayed on top of the input field
   */
  heading?: string;

  /**
   * The label string displayed on the dropzone
   */
  title: string;

  /**
   * Secondary label string displayed on the dropzone
   */
  subTitle: string;
}

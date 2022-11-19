export interface IFilePreviewProps {
  /**
   * Uploaded file
   */
  file: File;

  /**
   * Delete uploaded file handler
   */
  onDelete: () => void;

  /**
   * Replace uploaded file handler
   */
  onReplace: () => void;
}

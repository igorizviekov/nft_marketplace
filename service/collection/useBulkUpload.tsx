import { ICollection } from '../../store/model/app/app.types';
import axios from 'axios';
import JSZip from 'jszip';
import { parseCSVToJson } from './utilts';
import { saveAs } from 'file-saver';

const useBulkUpload = async (
  collection: ICollection,
  images: File | null
  // metadata: File | null,
  // price: number
) => {
  if (!images) return;
  const token = localStorage.getItem('token');

  const zip = new JSZip();

  zip.file(`${collection.name}`, images);

  zip.generateAsync({ type: 'binarystring' }).then((content) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_KEY}/collection/ipfs/${collection.id}`,
        {
          media: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data);
      });
  });
};

export default useBulkUpload;

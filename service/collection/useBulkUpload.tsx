import { ICollection } from '../../store/model/app/app.types';
import axios from 'axios';
import JSZip from 'jszip';
import saveAs from 'file-saver';
import csvParser from 'csv-parser';
import { parseCSVToJson } from './utilts';

const useBulkUpload = async (
  collection: ICollection,
  images: File | null,
  metadata: File | null,
  price: number
) => {
  const token = localStorage.getItem('token');

  const parsedCSV = await parseCSVToJson(metadata);
  const zip = new JSZip();

  const artFolder = zip.folder('art');
  const metadataFolder = zip.folder('metadata');

  if (artFolder && images) {
    artFolder.file(`${collection.name}.zip`, images);
  }
  if (metadataFolder && metadata) {
    metadataFolder.file(`${collection.name}.JSON`, parsedCSV);
  }

  zip.file('price.txt', `${price}`);

  console.log(zip.files);
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

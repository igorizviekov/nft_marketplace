import { ICollection } from '../../store/model/app/app.types';
import axios from 'axios';
import JSZip from 'jszip';
import saveAs from 'file-saver';

const useBulkUpload = async (
  collection: ICollection,
  images: File | null,
  metadata: File | null,
  price: number
) => {
  const token = localStorage.getItem('token');

  const zip = new JSZip();

  const artFolder = zip.folder('art');
  const metadataFolder = zip.folder('metadata');

  if (artFolder && images) {
    artFolder.file(`${collection.name}.zip`, images);
  }
  if (metadataFolder && metadata) {
    metadataFolder.file(`${collection.name}.JSON`, JSON.stringify(metadata));
  }

  zip.generateAsync({ type: 'binarystring' }).then((content) => {
    axios
      .post(
        `https://nft-api-production-4aa1.up.railway.app/collection/ipfs/${collection.id}`,
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

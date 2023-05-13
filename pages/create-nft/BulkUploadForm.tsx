import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Dropdown } from '../../components/ui/dropdown';
import BulkUpload from '../../components/BulkUpload/BulkUpload';
import BaseLink from '../../components/ui/Base/BaseLink/BaseLink';
import { ADD_COLLECTION } from './SingleForm';
import AddCollectionModal from '../../components/AddCollectionModal/AddCollectionModal';
import styles from '../../styles/pages/CreateNFTPage.module.scss';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useStoreActions, useStoreState } from '../../store';

const CollectionForm = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const OPTIONS = ['Collection 1', 'Collection 2', 'Collection 3'];

  const [selected, setSelected] = useState<number>(0);

  const { bulkInformation, formError } = useStoreState(
    (state) => state.bulkUpload
  );
  const { editBulkInformation, setFormError } = useStoreActions(
    (actions) => actions.bulkUpload
  );

  return (
    <div className={classNames('flex-col-center', styles.form)}>
      <Dropdown
        heading="Select a collection"
        options={[...OPTIONS, ADD_COLLECTION]}
        checked={selected}
        required
        placeholder="Or create a new one"
        onChange={setSelected}
        openModal={() => setModalOpen(true)}
      />
      <BulkUpload
        file={bulkInformation.images}
        onDropAccepted={(arr) => {
          editBulkInformation({
            ...bulkInformation,
            images: arr?.[0],
          });
        }}
        onUploadAbort={() =>
          editBulkInformation({
            ...bulkInformation,
            images: null,
          })
        }
        title={'Upload all images for the collection'}
        subTitle={'as a .zip or .rar'}
        isCsv={false}
      />
      <BulkUpload
        file={bulkInformation.metadata}
        onDropAccepted={(arr) => {
          editBulkInformation({
            ...bulkInformation,
            metadata: arr?.[0],
          });
        }}
        onUploadAbort={() =>
          editBulkInformation({
            ...bulkInformation,
            metadata: null,
          })
        }
        title={'Upload metadata'}
        subTitle={'as a .csv file'}
        isCsv={true}
      />
      <BaseLink
        href={
          'https://docs.google.com/spreadsheets/d/1t4EPrrKsbTUEjfAJMUgnWkyBRNFLO6bSycB8RyXIQy8/edit#gid=1841889481'
        }
      >
        <p>You can dowload our template here!</p>
      </BaseLink>
      <Input
        title={'NFT Price'}
        inputType={'number'}
        placeholder={'Enter NFT price'}
        value={bulkInformation.price && bulkInformation.price}
        handleChange={(e) =>
          editBulkInformation({
            ...bulkInformation,
            price: Number((e.target as HTMLInputElement).value),
          })
        }
        id={''}
      />
      {isModalOpen && (
        <AddCollectionModal handleModalClose={() => setModalOpen(false)} />
      )}
      <Button
        isPrimary
        label="Upload"
        disabled={formError}
        onClick={() => toast.warn('Upload bulk')}
      />
    </div>
  );
};

export default CollectionForm;

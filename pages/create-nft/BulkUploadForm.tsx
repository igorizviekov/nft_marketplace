import React, { useEffect, useState } from 'react';
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
import { validatePrice } from '../../components/ui/Input/utils';
import useBulkUpload from '../../service/collection/useBulkUpload';

const CollectionForm = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { collections } = useStoreState((state) => state.profile);

  const OPTIONS: Array<{ name: string; id: number }> = collections.map(
    (collection) => {
      return { name: collection.name, id: collection.tokenId };
    }
  );

  const [selected, setSelected] = useState<number>(0);

  const { bulkInformation, formError } = useStoreState(
    (state) => state.bulkUpload
  );
  const { editBulkInformation, setFormError } = useStoreActions(
    (actions) => actions.bulkUpload
  );

  useEffect(() => {
    if (
      bulkInformation.images !== null
      // bulkInformation.metadata !== null
      // bulkInformation.price !== 0
    ) {
      setFormError(false);
    }
  }, [bulkInformation]);

  return (
    <div className={classNames('flex-col-center', styles.form)}>
      <Dropdown
        heading="Select a collection"
        options={[
          ...OPTIONS.map((option) => {
            return option.name;
          }),
          ADD_COLLECTION.name,
        ]}
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
        title={'Upload collections compressed files'}
        subTitle={'as a .zip or .rar'}
        isCsv={false}
      />
      <BaseLink
        href={
          'https://docs.google.com/spreadsheets/d/1t4EPrrKsbTUEjfAJMUgnWkyBRNFLO6bSycB8RyXIQy8/edit#gid=1841889481'
        }
      >
        <p>You can check our template here!</p>
      </BaseLink>
      {/* <Input
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
      /> */}
      {isModalOpen && (
        <AddCollectionModal handleModalClose={() => setModalOpen(false)} />
      )}
      <Button
        isPrimary
        label="Upload"
        disabled={formError}
        onClick={() =>
          useBulkUpload(
            collections[selected],
            bulkInformation.images
            // bulkInformation.metadata,
            // bulkInformation.price
          )
        }
      />
    </div>
  );
};

export default CollectionForm;

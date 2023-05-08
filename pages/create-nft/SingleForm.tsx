import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import { FileUpload } from '../../components/file-upload';
import { Button } from '../../components/ui/Button';
import { isFormValid } from '../../scripts/utils';
import { Dropdown } from '../../components/ui/dropdown';
import AddCollectionModal from '../../components/AddCollectionModal/AddCollectionModal';
import styles from '../../styles/pages/CreateNFTPage.module.scss';
import classNames from 'classnames';
import {
  validateDescription,
  validateName,
  validatePrice,
} from '../../components/ui/Input/utils';
import Royalties from '../../components/Royalties/Royalties';
import { toast } from 'react-toastify';
import { useStoreActions, useStoreState } from '../../store';
import RoyaltiesList from '../../components/Royalties/RoyaltiesList';
import Traits from '../../components/Traits/Traits';
import TraitsList from '../../components/Traits/TraitsList';
import { Trait } from '../../store/model/nft-mint/nft-mint.types';
export interface IFormInput {
  name: string;
  description: string;
  price: string;
  image?: string;
  collection?: string;
}

export const ADD_COLLECTION = '+ Add Collection';
const SingleForm = () => {
  const [formInput, setFormInput] = useState<IFormInput>({
    price: '0',
    name: '',
    description: '',
    image: '',
    collection: '',
  });

  const royalties = useStoreState((state) => state.nftMint.royalties);
  const addRoyalty = useStoreActions((actions) => actions.nftMint.addRoyalty);
  const deleteRoyalty = useStoreActions(
    (actions) => actions.nftMint.deleteRoyalty
  );
  const addTrait = useStoreActions((actions) => actions.nftMint.addTrait);
  const deleteTrait = useStoreActions((actions) => actions.nftMint.deleteTrait);
  const traits = useStoreState((state) => state.nftMint.traits);

  const OPTIONS = ['Collection 1', 'Collection 2', 'Collection 3'];
  const [file, setFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<number>(-1);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<Element>) => {
    setFormInput({
      ...formInput,
      [e.target.id]: (e.target as HTMLInputElement).value,
    });
  };

  return (
    <div className={classNames('flex-col-center', styles.form)}>
      <FileUpload
        subTitle="JPG, PNG, GIF, SVG, WEBP, Max 600KB."
        title="Drag or click to upload a file"
        onDropAccepted={(arr) => {
          setFile(arr?.[0]);
        }}
        onUploadAbort={() => setFile(null)}
        file={file}
      />
      <Input
        id="name"
        inputType="text"
        title="Name"
        placeholder="NFT Name"
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            name: (e.target as HTMLInputElement).value,
          })
        }
        error={validateName(formInput.name)}
      />

      <Input
        inputType="textarea"
        title="Description"
        placeholder="NFT Description"
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            description: (e.target as HTMLTextAreaElement).value,
          })
        }
        id={'description'}
        error={validateDescription(formInput.description)}
      />
      <Dropdown
        heading="Select a collection (Optional)"
        options={[...OPTIONS, ADD_COLLECTION]}
        checked={selected}
        placeholder="Or create a new one"
        onChange={setSelected}
        openModal={() => setModalOpen(true)}
      />
      {selected === -1 && (
        <>
          <Royalties addRoyalty={addRoyalty} />
          <RoyaltiesList royalties={royalties} deleteRoyalty={deleteRoyalty} />
        </>
      )}
      {isModalOpen && (
        <AddCollectionModal handleModalClose={() => setModalOpen(false)} />
      )}
      <Traits addTrait={addTrait} />
      <TraitsList traits={traits} deleteTrait={deleteTrait} />
      <Input
        inputType="number"
        title="Price"
        placeholder="NFT Price"
        value={formInput.price}
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            price: (e.target as HTMLInputElement).value,
          })
        }
        id={'price'}
        error={validatePrice(Number(formInput.price))}
      />

      <Button
        isPrimary
        label="Create NFT"
        disabled={
          !isFormValid(
            formInput.name,
            Number(formInput.price),
            formInput.description,
            file
          )
        }
        onClick={() => toast.warn('Create NFT')}
      />
    </div>
  );
};

export default SingleForm;

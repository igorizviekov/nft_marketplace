import React, { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
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
import ProfileImageUpload from '../../components/ProfileImageUpload/ProfileImageUpload';
import { submitNewNFT } from '../../scripts/utils';
export interface IFormInput {
  name: string;
  description: string;
  price: string;
  image?: string;
  collection?: string;
}

export const ADD_COLLECTION = '+ Add Collection';
const SingleForm = () => {
  const {
    royalties,
    traits,
    royaltiesError,
    nftGeneralInfo,
    formError,
    traitsError,
  } = useStoreState((state) => state.nftMint);
  const {
    addRoyalty,
    deleteRoyalty,
    addTrait,
    deleteTrait,
    setRoyaltiesError,
    setTraitsError,
    editGeneralInformation,
    setFormError,
    setIsLoading,
  } = useStoreActions((actions) => actions.nftMint);

  const { isCollectionCreated } = useStoreActions(
    (actions) => actions.createCollection
  );

  const OPTIONS = ['Collection 1', 'Collection 2', 'Collection 3'];
  const [selected, setSelected] = useState<number>(-1);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<Element>) => {
    editGeneralInformation({
      ...nftGeneralInfo,
      [e.target.id]: (e.target as HTMLInputElement).value,
    });
  };

  useEffect(() => {
    editGeneralInformation({
      ...nftGeneralInfo,
      collection: OPTIONS[selected],
    });
  }, []);

  useEffect(() => {
    if (
      Boolean(nftGeneralInfo.name) &&
      Boolean(nftGeneralInfo.description) &&
      Boolean(nftGeneralInfo.price) &&
      Boolean(nftGeneralInfo.image)
    ) {
      setFormError(false);
    } else {
      setFormError(true);
    }
  }, [nftGeneralInfo]);

  return (
    <div className={classNames('flex-col-center', styles.form)}>
      <ProfileImageUpload
        file={nftGeneralInfo.image}
        onDropAccepted={(arr) => {
          editGeneralInformation({
            ...nftGeneralInfo,
            image: arr[0],
          });
        }}
        onUploadAbort={() =>
          editGeneralInformation({ ...nftGeneralInfo, image: null })
        }
        title={'Upload your'}
        subTitle={'NFT Image'}
      />
      <Input
        id={'name'}
        inputType={'text'}
        title={'Name'}
        placeholder="NFT Name"
        handleChange={changeHandler}
        value={nftGeneralInfo.name}
        error={validateName(
          nftGeneralInfo.name,
          nftGeneralInfo.description,
          nftGeneralInfo.price
        )}
      />

      <Input
        inputType="textarea"
        title="Description"
        placeholder="NFT Description"
        handleChange={changeHandler}
        value={nftGeneralInfo.description}
        id={'description'}
        error={validateDescription(
          nftGeneralInfo.description,
          nftGeneralInfo.name,
          nftGeneralInfo.price
        )}
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
          <Royalties
            royalties={royalties}
            addRoyalty={addRoyalty}
            royaltiesError={royaltiesError}
            setFormError={setRoyaltiesError}
          />
          <RoyaltiesList royalties={royalties} deleteRoyalty={deleteRoyalty} />
        </>
      )}
      {isModalOpen && (
        <AddCollectionModal
          handleModalClose={() => {
            isCollectionCreated(false);
            setModalOpen(false);
          }}
        />
      )}
      <Traits
        traits={traits}
        addTrait={addTrait}
        setFormError={setTraitsError}
        traitError={traitsError}
      />
      <TraitsList traits={traits} deleteTrait={deleteTrait} />
      <Input
        inputType="number"
        title="Price"
        placeholder="NFT Price"
        value={nftGeneralInfo.price}
        handleChange={changeHandler}
        id={'price'}
        error={validatePrice(
          nftGeneralInfo.price,
          nftGeneralInfo.name,
          nftGeneralInfo.description
        )}
      />

      <Button
        isPrimary
        label="Create NFT"
        disabled={formError}
        onClick={() => submitNewNFT(nftGeneralInfo, setIsLoading)}
      />
    </div>
  );
};

export default SingleForm;

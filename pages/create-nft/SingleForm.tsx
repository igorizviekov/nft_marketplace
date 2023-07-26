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
import { useStoreActions, useStoreState } from '../../store';
import RoyaltiesList from '../../components/Royalties/RoyaltiesList';
import Traits from '../../components/Traits/Traits';
import TraitsList from '../../components/Traits/TraitsList';
import ProfileImageUpload from '../../components/ProfileImageUpload/ProfileImageUpload';
import useMintNFT from '../../service/useMintNFT';
import { Spinner } from '../../components/spinner';
import { useRouter } from 'next/router';
import useUpdateUserCollections from '../../service/useUpdateUserCollections';
export interface IFormInput {
  name: string;
  description: string;
  price: string;
  image?: string;
  collection?: string;
}

export const ADD_COLLECTION: { name: string; id: number } = {
  name: '+ Add Collection',
  id: 0,
};
const SingleForm = () => {
  const {
    royalties,
    traits,
    royaltiesError,
    nftGeneralInfo,
    formError,
    traitsError,
    isLoading,
  } = useStoreState((state) => state.nftMint);
  const {
    addRoyalty,
    deleteRoyalty,
    addTrait,
    deleteTrait,
    setRoyaltiesError,
    setTraitsError,
    editGeneralInformation,
    resetTraits,
    setFormError,
    setIsLoading,
  } = useStoreActions((actions) => actions.nftMint);

  const router = useRouter();
  const { collections } = useStoreState((state) => state.profile);
  const { activeWallet } = useStoreState((state) => state.wallet);

  const { setNFT } = useStoreActions((actions) => actions.nftView);
  const { isCollectionCreated } = useStoreActions(
    (actions) => actions.createCollection
  );
  const { updateCollections } = useStoreActions((actions) => actions.profile);

  const OPTIONS: Array<{ name: string; id: number }> = [
    { name: 'None', id: 1 },
  ];
  const [selected, setSelected] = useState<number>(0);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<Element>) => {
    editGeneralInformation({
      ...nftGeneralInfo,
      [e.target.id]: (e.target as HTMLInputElement).value,
    });
  };

  useEffect(() => {
    collections.forEach((collection) => {
      OPTIONS.push({ name: collection.name, id: collection.tokenId });
    });
    OPTIONS.length > 0 &&
      editGeneralInformation({
        ...nftGeneralInfo,
        collection: OPTIONS[selected].name,
      });
  }, []);

  useUpdateUserCollections(updateCollections, isModalOpen);

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
    <div className={classNames(styles.form)}>
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
      {OPTIONS && (
        <Dropdown
          heading="Select a collection (Optional)"
          options={[
            ...OPTIONS.map((option) => {
              return option.name;
            }),
            ADD_COLLECTION.name,
          ]}
          checked={selected}
          placeholder="Or create a new one"
          onChange={setSelected}
          openModal={() => setModalOpen(true)}
        />
      )}
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
      <div style={{ gap: '22px', display: 'flex', flexDirection: 'column' }}>
        <h1>{'Attributes (Optional)'}</h1>
        <Traits
          isTrait
          traits={traits}
          addTrait={addTrait}
          setFormError={setTraitsError}
          traitError={traitsError}
          leftLabel="Trait (Optional)"
          rightLabel="Value (Optional)"
          leftPlaceholder="Add Trait Type"
          rightPlaceholder="Add Trait Value"
        />
        <TraitsList traits={traits} deleteTrait={deleteTrait} />
      </div>
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
      {isLoading && <Spinner />}
      <Button
        isPrimary
        label="Create NFT"
        disabled={formError || isLoading}
        onClick={() =>
          useMintNFT(
            nftGeneralInfo,
            traits,
            setIsLoading,
            OPTIONS[selected].id,
            nftGeneralInfo.price,
            activeWallet,
            editGeneralInformation,
            resetTraits,
            router,
            setNFT
          )
        }
      />
    </div>
  );
};

export default SingleForm;

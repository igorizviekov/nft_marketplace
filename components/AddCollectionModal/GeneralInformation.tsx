import React, { useEffect } from 'react';
import ProfileImageUpload from '../ProfileImageUpload/ProfileImageUpload';
import Input from '../ui/Input';
import { IModalSteps } from './AddCollectionModal.types';
import { validateDescription, validateName, validateWebsite } from './utils';
import { Button } from '../ui/Button';
import { useStoreActions, useStoreState } from '../../store';

const GeneralInformation = ({ handleSteps }: IModalSteps) => {
  const { generalInformation, gralInfoFormError } = useStoreState(
    (state) => state.collection
  );
  const { setGralInfoFormError, editGeneralInformation } = useStoreActions(
    (actions) => actions.collection
  );

  function handleClick() {
    handleSteps();
  }

  const changeHandler = (e: React.ChangeEvent<Element>) => {
    editGeneralInformation({
      ...generalInformation,
      [e.currentTarget.id]: (e.target as HTMLInputElement).value,
    });
  };

  const handleError = () => {
    if (
      generalInformation.name &&
      generalInformation.description &&
      generalInformation.file
    ) {
      setGralInfoFormError(false);
    } else {
      setGralInfoFormError(true);
    }
  };

  useEffect(() => {
    handleError();
  }, [generalInformation]);

  return (
    <>
      <h1>General Information</h1>
      <ProfileImageUpload
        file={generalInformation.file}
        onUploadAbort={() =>
          editGeneralInformation({ ...generalInformation, file: null })
        }
        onDropAccepted={(arr) =>
          editGeneralInformation({
            ...generalInformation,
            file: arr[0],
          })
        }
        title={'Upload'}
        subTitle={'Collection Avatar'}
      />
      <Input
        title={'Name'}
        inputType={'text'}
        placeholder={'Enter collections name'}
        id={'name'}
        handleChange={changeHandler}
        value={generalInformation.name}
        error={validateName(generalInformation.name)}
      />
      <Input
        title={'Description'}
        inputType={'textarea'}
        placeholder={'Enter collections description'}
        id={'description'}
        value={generalInformation.description}
        handleChange={changeHandler}
        error={validateDescription(generalInformation.description)}
      />
      <Input
        title={'Website (Optional)'}
        inputType={'text'}
        placeholder={'Link a website'}
        id={'website'}
        value={generalInformation.website}
        handleChange={changeHandler}
        error={validateWebsite(generalInformation.website)}
      />
      <Button
        isPrimary={false}
        disabled={gralInfoFormError}
        label={'Next Step'}
        onClick={handleClick}
      />
    </>
  );
};

export default GeneralInformation;

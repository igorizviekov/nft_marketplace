import React, { useState } from 'react';
import ProfileImageUpload from '../ProfileImageUpload/ProfileImageUpload';
import Input from '../ui/Input';
import { IGeneralInformationInput } from './AddCollectionModal.types';
import { validateDescription, validateName, validateWebsite } from './utils';

const GeneralInformation = () => {
  const [file, setFile] = useState<File | null>(null);

  const [formInput, setFormInput] = useState<IGeneralInformationInput>({
    file: null,
    name: '',
    description: '',
  });
  return (
    <>
      <h1>General Information</h1>
      <ProfileImageUpload
        file={formInput.file}
        onUploadAbort={() => setFormInput({ ...formInput, file: null })}
        onDropAccepted={(arr) =>
          setFormInput({
            ...formInput,
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
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            name: (e.target as HTMLInputElement).value,
          })
        }
        value={formInput.name}
        error={validateName(formInput.name)}
      />
      <Input
        title={'Description'}
        inputType={'textarea'}
        placeholder={'Enter collections description'}
        id={'description'}
        value={formInput.description}
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            description: (e.target as HTMLInputElement).value,
          })
        }
        error={validateDescription(formInput.description)}
      />
      <Input
        title={'Website (Optional)'}
        inputType={'text'}
        placeholder={'Link a website'}
        id={'website'}
        value={formInput.website}
        handleChange={(e) =>
          setFormInput({
            ...formInput,
            website: (e.target as HTMLInputElement).value,
          })
        }
        error={formInput.website && validateWebsite(formInput.website)}
      />
    </>
  );
};

export default GeneralInformation;

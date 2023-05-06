import React, { useState } from 'react';
import ProfileImageUpload from '../ProfileImageUpload/ProfileImageUpload';
import Input from '../ui/Input';

const GeneralInformation = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <h1>General Information</h1>
      <ProfileImageUpload
        file={file}
        onUploadAbort={() => setFile(null)}
        title={'Upload'}
        subTitle={'Collection Avatar'}
      />
      <Input
        title={'Name'}
        inputType={'text'}
        placeholder={'Enter collections name'}
        id={'name'}
      />
      <Input
        title={'Description'}
        inputType={'textarea'}
        placeholder={'Enter collections description'}
        id={'description'}
      />
      <Input
        title={'Website (Optional)'}
        inputType={'text'}
        placeholder={'Link a website'}
        id={'website'}
      />
    </>
  );
};

export default GeneralInformation;

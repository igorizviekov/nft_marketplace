import React from 'react';
import BaseImage from '../../../../components/ui/Base/BaseImage/BaseImage';
import BasePage from '../../../../components/ui/Base/BasePage/BasePage';
import { Button } from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import styles from '../../../../styles/pages/EditProfilePage.module.scss';
const EditProfile = () => {
  const handleSubmit = () => {
    console.log('submit ');
  };
  return (
    <BasePage>
      <div className="flex-col-center">
        <div className={styles.image}>
          <BaseImage />
        </div>

        <div className={styles.form}>
          <Input
            title={'Display Name'}
            inputType={'text'}
            placeholder={'Enter you display name...'}
          />
          <Input
            title={'Description'}
            inputType={'text'}
            placeholder={'And now, your description...'}
          />
          <Input
            title={'Email'}
            inputType={'text'}
            placeholder={'An email...'}
          />
          <Input
            title={'Location'}
            inputType={'text'}
            placeholder={'Your location if you want to...'}
          />
          <Input
            title={'Profile Url'}
            inputType={'text'}
            placeholder={'A short profile URL'}
          />
          <Input
            title={'Website'}
            inputType={'text'}
            placeholder={'If you got a website...'}
          />
          <Input
            title={'Discord'}
            inputType={'text'}
            placeholder={'Your discord ID...'}
          />
          <Input
            title={'Twitter'}
            inputType={'text'}
            placeholder={'Your twitter profile URL...'}
          />
          <Input
            title={'Instagram'}
            inputType={'text'}
            placeholder={'And your instagram profile URL...'}
          />
        </div>
        <Button isPrimary={true} label={'Submit'} onClick={handleSubmit} />
      </div>
    </BasePage>
  );
};

export default EditProfile;

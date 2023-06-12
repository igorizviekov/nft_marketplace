import React, { useEffect, useState } from 'react';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useStoreActions, useStoreState } from '../../store';
import styles from '../../styles/pages/EditProfilePage.module.scss';
import ProfileImageUpload from '../../components/ProfileImageUpload/ProfileImageUpload';
import useUpdateProfile from '../../service/useUpdateProfile';
import { useRouter } from 'next/router';
import { Spinner } from '../../components/spinner';
import { useStoreRehydrated } from 'easy-peasy';
const EditProfile = () => {
  const [file, setFile] = useState<File | null>(null);
  const { updateProfile } = useStoreActions((actions) => actions.profile);
  const { profile } = useStoreState((state) => state.profile);
  const { isWalletConnected } = useStoreState((state) => state.wallet);
  const router = useRouter();
  const isRehydrated = useStoreRehydrated();

  const handleChange = (e: React.ChangeEvent<Element>) => {
    updateProfile({
      ...profile,
      [e.target.id]: (e.target as HTMLInputElement).value,
    });
  };
  return (
    <BasePage>
      {isWalletConnected && isRehydrated ? (
        <div className={styles.page}>
          <div className={styles.image}>
            {/* {profile.image && <BaseImage />} */}
            <ProfileImageUpload
              file={file}
              onUploadAbort={() => setFile(null)}
              onDropAccepted={(arr) => setFile(arr?.[0])}
              title={'Upload an Image'}
              subTitle={'or Select and NFT'}
            />
          </div>

          <div className={styles.form}>
            <h1>Profile Settings</h1>
            <Input
              title={'Display Name'}
              inputType={'text'}
              placeholder={'Enter you display name...'}
              handleChange={handleChange}
              value={profile.name}
              id={'name'}
            />
            {/* <Input
            title={'Description'}
            inputType={'textarea'}
            placeholder={'And now, your description...'}
            handleChange={handleChange}
            value={profile.description}
            id={'description'}
          /> */}
            <Input
              title={'Email'}
              inputType={'text'}
              placeholder={'An email...'}
              value={profile.email}
              handleChange={handleChange}
              id={'email'}
            />
            <Input
              title={'Location'}
              inputType={'text'}
              placeholder={'Your location if you want to...'}
              value={profile.location}
              handleChange={handleChange}
              id={'location'}
            />
            <Input
              title={'Website'}
              inputType={'text'}
              placeholder={'If you got a website...'}
              value={profile.website}
              handleChange={handleChange}
              id={'website'}
            />
            <h1 className={styles.social}>Social Settings</h1>
            <Input
              title={'Discord'}
              inputType={'text'}
              placeholder={'Your discord ID...'}
              value={profile.discord}
              handleChange={handleChange}
              id={'discord'}
            />
            {/* <Input
            title={'Twitter'}
            inputType={'text'}
            placeholder={'Your twitter profile URL...'}
            handleChange={(e) =>
              setTwitter((e.target as HTMLInputElement).value)
            }
            id={''}
          />
          <Input
            title={'Instagram'}
            inputType={'text'}
            placeholder={'And your instagram profile URL...'}
            handleChange={(e) =>
              setInstagram((e.target as HTMLInputElement).value)
            }
            id={''}
          /> */}

            {/* <h1 className={styles.social}>App Settings</h1>
          <Input
            inputType={'text'}
            title={'Time and Date'}
            placeholder={'how time and date are formated'}
            id={''}
          />
          <Input
            inputType={'text'}
            title={'Time Zone'}
            placeholder={'Dropdowns'}
            id={''}
          />
          <Input
            inputType={'text'}
            title={'Language'}
            placeholder={'Dropdowns'}
            id={''}
          /> */}
            <Button
              isPrimary={false}
              label={'Save Settings'}
              onClick={() => useUpdateProfile(profile, file)}
            />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </BasePage>
  );
};

export default EditProfile;

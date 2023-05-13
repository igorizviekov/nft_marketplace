import React, { useState } from 'react';
import BaseImage from '../../components/ui/Base/BaseImage/BaseImage';
import BasePage from '../../components/ui/Base/BasePage/BasePage';
import { Button } from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useStoreActions } from '../../store';
import styles from '../../styles/pages/EditProfilePage.module.scss';
import ProfileImageUpload from '../../components/ProfileImageUpload/ProfileImageUpload';
import { toast } from 'react-toastify';
const EditProfile = () => {
  const [avatar, setAvatar] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [discord, setDiscord] = useState<string>();
  const [twitter, setTwitter] = useState<string>();
  const [instagram, setInstagram] = useState<string>();
  const [file, setFile] = useState<File | null>(null);

  const { updateProfile } = useStoreActions((actions) => actions.profile);
  const handleSubmit = () => {
    updateProfile({
      avatar: avatar,
      username: username,
      description: description,
      email: email,
      location: location,
      website: website,
      discord: discord,
      twitter: twitter,
      instagram: instagram,
    });
  };
  return (
    <BasePage>
      <div className={styles.page}>
        <div className={styles.image}>
          {avatar && <BaseImage />}
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
            handleChange={(e) =>
              setUsername((e.target as HTMLInputElement).value)
            }
            id={''}
          />
          <Input
            title={'Description'}
            inputType={'textarea'}
            placeholder={'And now, your description...'}
            handleChange={(e) =>
              setDescription((e.target as HTMLInputElement).value)
            }
            id={''}
          />
          <Input
            title={'Email'}
            inputType={'text'}
            placeholder={'An email...'}
            handleChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            id={''}
          />
          <Input
            title={'Location'}
            inputType={'text'}
            placeholder={'Your location if you want to...'}
            handleChange={(e) =>
              setLocation((e.target as HTMLInputElement).value)
            }
            id={''}
          />
          <Input
            title={'Website'}
            inputType={'text'}
            placeholder={'If you got a website...'}
            handleChange={(e) =>
              setWebsite((e.target as HTMLInputElement).value)
            }
            id={''}
          />
          <h1 className={styles.social}>Social Settings</h1>
          <Input
            title={'Discord'}
            inputType={'text'}
            placeholder={'Your discord ID...'}
            handleChange={(e) =>
              setDiscord((e.target as HTMLInputElement).value)
            }
            id={''}
          />
          <Input
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
          />

          <h1 className={styles.social}>App Settings</h1>
          <Input
            inputType={'text'}
            title={'Time and Date'}
            placeholder={'Dropdowns'}
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
          />
          <Button
            isPrimary={false}
            label={'Save Settings'}
            onClick={() => toast.warn('Upload to form DB')}
          />
        </div>
      </div>
    </BasePage>
  );
};

export default EditProfile;

import React, { useState } from 'react';
import BaseImage from '../../../../components/ui/Base/BaseImage/BaseImage';
import BasePage from '../../../../components/ui/Base/BasePage/BasePage';
import { Button } from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import { useStoreActions } from '../../../../store';
import styles from '../../../../styles/pages/EditProfilePage.module.scss';
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

  const updateProfile = useStoreActions(
    (actions) => actions.profile.updateProfile
  );
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
      <div className="flex-col-center">
        <div className={styles.image}>
          <BaseImage />
        </div>

        <div className={styles.form}>
          <Input
            title={'Display Name'}
            inputType={'text'}
            placeholder={'Enter you display name...'}
            handleChange={(e) =>
              setUsername((e.target as HTMLInputElement).value)
            }
          />
          <Input
            title={'Description'}
            inputType={'text'}
            placeholder={'And now, your description...'}
            handleChange={(e) =>
              setDescription((e.target as HTMLInputElement).value)
            }
          />
          <Input
            title={'Email'}
            inputType={'text'}
            placeholder={'An email...'}
            handleChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
          <Input
            title={'Location'}
            inputType={'text'}
            placeholder={'Your location if you want to...'}
            handleChange={(e) =>
              setLocation((e.target as HTMLInputElement).value)
            }
          />
          <Input
            title={'Website'}
            inputType={'text'}
            placeholder={'If you got a website...'}
            handleChange={(e) =>
              setWebsite((e.target as HTMLInputElement).value)
            }
          />
          <Input
            title={'Discord'}
            inputType={'text'}
            placeholder={'Your discord ID...'}
            handleChange={(e) =>
              setDiscord((e.target as HTMLInputElement).value)
            }
          />
          <Input
            title={'Twitter'}
            inputType={'text'}
            placeholder={'Your twitter profile URL...'}
            handleChange={(e) =>
              setTwitter((e.target as HTMLInputElement).value)
            }
          />
          <Input
            title={'Instagram'}
            inputType={'text'}
            placeholder={'And your instagram profile URL...'}
            handleChange={(e) =>
              setInstagram((e.target as HTMLInputElement).value)
            }
          />
        </div>
        <Button isPrimary={true} label={'Submit'} onClick={handleSubmit} />
      </div>
    </BasePage>
  );
};

export default EditProfile;

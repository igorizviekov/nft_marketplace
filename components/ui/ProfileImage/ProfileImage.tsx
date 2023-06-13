import React from 'react';
import { IProfileImageProps } from './ProfileImage.types';
import styles from './ProfileImage.module.scss';
import BaseImage from '../Base/BaseImage/BaseImage';

const ProfileImage = ({
  profileName,
  profileImageUrl,
  profileDescription,
}: IProfileImageProps) => {
  return (
    <div className="flex-col-center">
      <h1>{profileName}</h1>
      <div className={styles.imageContainer}>
        <BaseImage description={profileDescription} />
      </div>
    </div>
  );
};

export default ProfileImage;

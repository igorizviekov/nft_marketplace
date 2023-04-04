import Image from 'next/image';
import React from 'react';
import styles from './Image.module.scss';
const ProfileImage = () => {
  const TEST_IMAGE_URL =
    'https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FUh4mcnLwpIp3GqAkpfXRZA%2Fnormalized.jpg&width=800';
  return (
    <div className={styles.container}>
      <Image src={TEST_IMAGE_URL} alt={'test image'} fill />
    </div>
  );
};

export default ProfileImage;

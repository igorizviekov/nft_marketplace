import React, { useState } from 'react';
import classNames from 'classnames';
import Image from '../../components/ui/Image/Image';
import styles from '../../styles/pages/ProfilePage.module.scss';
import Icon from '../../components/ui/Icon/Icon';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Tabs } from '../../components/ui/Tabs/Tabs';
const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  return (
    <div className={classNames('section flex-col')}>
      <div className="flex-row">
        <div className={styles.imageContainer}>
          <Image />
        </div>
        <div className={classNames(styles.textContainer, 'flex-col')}>
          <h1>Johanna DOE</h1>
          <div className="flex-row">
            <Icon icon={<FaDiscord />} />
            <Icon icon={<FaTwitter />} />
            <Icon icon={<FaInstagram />} />
          </div>
          <p>
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nulla consequat massa quis
            enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
            arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
            justo.
          </p>
        </div>
      </div>

      <div className="flex-col">
        <Tabs
          options={['On sale', 'Created', 'Owned', 'Liked', 'Activity']}
          selected={selectedTab}
          handleChange={setSelectedTab}
        />
      </div>
    </div>
  );
};

export default ProfilePage;

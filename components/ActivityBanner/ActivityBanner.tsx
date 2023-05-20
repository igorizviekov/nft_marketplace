import React, { useRef, useState } from 'react';
import styles from './ActivityBanner.module.scss';
import { IActivityBannerProps } from './ActivityBanner.types';
import BaseImage from '../ui/Base/BaseImage/BaseImage';
import { useStoreState } from '../../store';
import { formatAddress, formatDate } from '../BaseTable/TableBodies/ActivityBody/utils';
import TimeTooltip from '../BaseTable/TableBodies/ActivityBody/TimeTooltip';
const ActivityBanner = ({
  img,
  name,
  transactionType,
  seller,
  buyer,
  time,
  total,
}: IActivityBannerProps) => {
  const { currency } = useStoreState((state) => state.wallet);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <BaseImage />
      </div>
      <p className={styles.text}>{name}</p>
      <p>{transactionType}</p>
      <p className={styles.text}>{formatAddress(seller)}</p>
      <p className={styles.text}>{formatAddress(buyer)}</p>
      <p
        className={styles.time}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {formatDate(time)}
        {showTooltip && <TimeTooltip time={time} />}
      </p>
      <p>
        {total} {currency}
      </p>
    </div>
  );
};

export default ActivityBanner;

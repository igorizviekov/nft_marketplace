import React, { useState } from 'react';
import styles from './ActivityBody.module.scss';
import { IActivityBodyProps } from './ActivityBody.types';
import BaseImage from '../../../ui/Base/BaseImage/BaseImage';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useStoreState } from '../../../../store';
import { formatAddress, formatDate } from './utils';
import TimeTooltip from './TimeTooltip';
const ActivityBody = ({ activities }: IActivityBodyProps) => {
  const router = useRouter();
  const { currency } = useStoreState((state) => state.wallet);

  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  return (
    <tbody className={styles.body}>
      {activities.map((activity, index) => (
        <tr key={index}>
          <td>
            <div className={styles.image}>
              <BaseImage imageUrl={activity.image_uri} />
            </div>
            <p>{activity.nft_id}</p>
          </td>
          <td>{activity.transaction_type}</td>
          <td className={styles.text}>
            {formatAddress(activity.seller_address)}
          </td>
          <td className={styles.text}>
            {formatAddress(activity.buyer_address)}
          </td>
          <td
            className={styles.time}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {formatDate(activity.date)}
            {showTooltip && <TimeTooltip time={activity.date} />}
          </td>
          <td>
            {activity.token_value} {currency}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ActivityBody;

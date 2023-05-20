import React, { useRef, useState } from 'react';
import styles from './ActivityBody.module.scss';
import { IActivityBodyProps } from './ActivityBody.types';
import BaseImage from '../../../ui/Base/BaseImage/BaseImage';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useStoreState } from '../../../../store';
import { formatAddress, formatDate } from './utils';
import TimeTooltip from './TimeTooltip';
import useHover from '../../../../hooks/useHover';
import { INFTLog } from '../../../../store/model/profile/profile.types';
const ActivityBody = ({ activities }: IActivityBodyProps) => {
  const router = useRouter();
  const { currency } = useStoreState((state) => state.wallet);

  return (
    <tbody className={styles.body}>
      {activities.map((activity, index) => {
        return (
          <tr key={index}>
            <td>
              <div className={styles.image}>
                <BaseImage />
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
            <TimeTD activity={activity} />
            <td>
              {activity.token_value} {currency}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export const TimeTD = ({ activity }: { activity: INFTLog }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <td
      className={styles.time}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {formatDate(activity.date)}
      {showTooltip && <TimeTooltip time={activity.date} />}
    </td>
  );
};
export default ActivityBody;

import React from 'react';
import styles from './ActivityBody.module.scss';
import { ITooltipProps } from '../../../ActivityBanner/ActivityBanner.types';
import { formatTooltipDate } from './utils';
const TimeTooltip = ({ time }: ITooltipProps) => {
  return (
    <div className={styles.timeTooltip}>
      <small>{formatTooltipDate(time)}</small>
    </div>
  );
};

export default TimeTooltip;

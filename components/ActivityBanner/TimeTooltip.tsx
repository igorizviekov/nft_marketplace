import React from 'react';
import styles from './ActivityBanner.module.scss';
import { ITooltipProps } from './ActivityBanner.types';
import { formatTooltipDate } from './utils';
const TimeTooltip = ({ time }: ITooltipProps) => {
  return (
    <div className={styles.timeTooltip}>
      <small>{formatTooltipDate(time)}</small>
    </div>
  );
};

export default TimeTooltip;

import React from 'react';
import styles from './ActivityBody.module.scss';
import { formatTooltipDate } from './utils';
import { ITooltipProps } from './ActivityBody.types';
const TimeTooltip = ({ time }: ITooltipProps) => {
  return (
    <div className={styles.timeTooltip}>
      <small>{formatTooltipDate(time)}</small>
    </div>
  );
};

export default TimeTooltip;

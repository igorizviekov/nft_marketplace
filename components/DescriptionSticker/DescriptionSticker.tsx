import React from 'react';
import styles from './DescriptionSticker.module.scss';
import { IDescriptionStickerProps } from './DescriptionSticker.types';
import classNames from 'classnames';

const DescriptionSticker = ({
  title,
  data,
  type,
}: IDescriptionStickerProps) => {
  const className =
    type === 'PRIMARY'
      ? styles.primary
      : type === 'SECONDARY' && styles.secondary;
  return (
    <div className={classNames(className)}>
      <h3>{title}</h3>
      <h1>{data}</h1>
    </div>
  );
};

export default DescriptionSticker;

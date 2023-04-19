import React from 'react';
import styles from './CreateNftCard.module.scss';
import { ICreateNftCard } from './CreateNftCard.types';
import Single from './Single';
import Collection from './Collection';
import { toast } from 'react-toastify';
const CreateNftCard = ({
  onSingleClick,
  onCollectionClick,
}: ICreateNftCard) => {
  return (
    <div className={'flex-row-center'}>
      <Single onSingleClick={onSingleClick} />
      <Collection onCollectionClick={onCollectionClick} />
    </div>
  );
};

export default CreateNftCard;

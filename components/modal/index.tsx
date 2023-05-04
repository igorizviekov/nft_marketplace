import React, { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IModalProps } from './modal.types';
import Icon from '../ui/Icon/Icon';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import styles from './Modal.module.scss';
import { RiCloseCircleFill } from 'react-icons/ri';

export const Modal = ({ children, onClose }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(modalRef, () => onClose());

  return (
    <div className={styles.backdrop}>
      <div className={styles.container} ref={modalRef}>
        <div className={styles.icon}>
          <Icon
            icon={
              <RiCloseCircleFill
                style={{ width: '30px', height: '30px' }}
              />
            }
            onClick={onClose}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

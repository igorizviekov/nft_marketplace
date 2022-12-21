import React, { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { IModalProps } from './modal.types';

const modal = ({ header, footer, body, onClose }: IModalProps) => {
  const modalRef = useRef<any>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      className="flexCenter fixed inset-0 z-50 backdrop-blur-sm animated fadeIn"
      onClick={handleClickOutside}
    >
      <div
        className="w-2/5 md:w-11/12 minlg:2/4 dark:bg-nft-dark bg-white flex flex-col rounded-lg"
        ref={modalRef}
      >
        <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
          <div
            className="relative w-3 h-3 minlg:w-6 minlg:h-6 cursor-pointer"
            onClick={onClose}
          >
            <AiOutlineClose />
          </div>
        </div>

        <div className="flexCenter w-full text-center p-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-normal text-2xl">
            {header}
          </h2>
        </div>
        <div className="p-10 sm:px-4 border-t border-b dark:border-nft-black-3 border-nft-gray-1">
          {body}
        </div>
        <div className="flexCenter p-4">{footer}</div>
      </div>
    </div>
  );
};

export default modal;

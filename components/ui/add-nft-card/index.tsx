import React from 'react';
import { FaPlus } from 'react-icons/fa';

const AddNftCard = ({ onClick }: IAddNftCardProps) => {
  return (
    <div className="w-60 h-60 border-dashed border-2 border-white-100 rounded-md m-5 flex flex-col justify-center items-center cursor-pointer">
      <p>Add NFT</p>
      <FaPlus color="white" />
    </div>
  );
};

export default AddNftCard;

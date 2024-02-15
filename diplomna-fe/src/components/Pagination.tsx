import React from 'react';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import { PaginationProps } from '../interface';


const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages-1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4 bg-gradient-to-r">
      <button className="btn-circle bg-green-500 m-2 flex items-center justify-center" onClick={handlePrev}>
        <IoMdArrowRoundBack />
      </button>
      <span className="mx-2">{currentPage + 1} / {totalPages}</span>
      <button className="btn-circle bg-green-500 m-2 flex items-center justify-center" onClick={handleNext}>
        <IoMdArrowRoundForward />
      </button>
    </div>
  );
};

export default Pagination;

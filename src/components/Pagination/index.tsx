import React from 'react';
import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss';

interface PaginationProps {
  onChangePage: (number: number) => void;
}

const Pagination = ({ onChangePage }: PaginationProps) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
    />
  );
};

export default Pagination;

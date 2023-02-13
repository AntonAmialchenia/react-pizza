import ReactPaginate from 'react-paginate';
import {  useDispatch } from 'react-redux';

import { setCurrentPage } from '../../redux/slices/filterSlice';
import style from './Pagination.module.scss';



const Pagination = () => {
  const dispatch = useDispatch();
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={5}
      pageCount={3}
      previousLabel="<"
    />
  );
};

export default Pagination;

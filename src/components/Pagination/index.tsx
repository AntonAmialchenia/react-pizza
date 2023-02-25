import ReactPaginate from 'react-paginate';
import { useAppDispatch } from '../../hooks';

import { setCurrentPage } from '../../redux/slices/filterSlice';
import style from './Pagination.module.scss';



const Pagination = () => {
  const dispatch = useAppDispatch();
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

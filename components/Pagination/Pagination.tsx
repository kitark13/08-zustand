import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  countPage: number;
  currentPage: number;
  onChangePage: (num: number) => void;
}
export default function Pagination({
  countPage,
  currentPage,
  onChangePage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={Math.max(countPage, 1)}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={(num) => onChangePage(num.selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

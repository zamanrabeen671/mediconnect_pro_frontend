import React from "react";
import ReactPaginate from "react-paginate";

type PropsType = {
  pageCount?: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePageClick(data: any): void;
  pageRange: number;
  currentPage?: number;
};

const Pagination: React.FC<PropsType> = ({
  pageCount,
  handlePageClick,
  pageRange,
  currentPage,
}) => {
  return (
    <div className="table-pagination">
      <ReactPaginate
        forcePage={currentPage}
        nextLabel=">>"
        onPageChange={handlePageClick}
        marginPagesDisplayed={2}
        pageRangeDisplayed={pageRange ? pageRange : 3}
        pageCount={pageCount || 1}
        // initialPage={pageNumber}
        // forcePage={pageNumber}
        previousLabel="<<"
        pageClassName="flex items-center justify-center h-10 w-10 rounded-full  bg-white dark:bg-black border border-gray-300 hover:bg-gray-100"
        pageLinkClassName="flex items-center justify-center h-10 w-10 rounded-full"
        previousClassName="flex items-center justify-center h-10 w-10 px-3 ml-0 leading-tight text-gray-500 dark:text-gray-200 bg-white dark:bg-black border border-gray-300 rounded-3xl hover:bg-gray-100 hover:text-gray-700"
        previousLinkClassName="page-link"
        nextClassName="paginate_button page-item next"
        nextLinkClassName="flex items-center justify-center h-10 w-10 px-3 leading-tight text-gray-500 dark:text-gray-200 bg-white dark:bg-black border border-gray-300 rounded-3xl hover:bg-gray-100 hover:text-gray-700"
        breakLabel="..."
        breakClassName="page-item px-1"
        breakLinkClassName="page-link"
        containerClassName="flex items-center justify-center gap-1 mt-6"
        activeClassName="!bg-green-500 text-white border border-gray-300 hover:bg-primary_color pointer-events-none"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Table from "../../components/Common/TableComponent";
import { categoryDelete, getCategoryList } from "../../store/API/categoryApi";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Pagination from "../../components/Common/Pagination";

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const { categoryList } = useAppSelector((state) => state.category);
  const [searchValue, setSearchValue] = useState("");
  const limit = 10;

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getCategoryList({ page: 1, limit, type: 'all' }));
  }, [dispatch]);

  const columns = [
    { header: "Category Name", accessor: "name" },
    { header: "Category Type", accessor: "type" },
    //   {
    //     header: "Category",
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     accessor: (item: any) => item?.category?.name,
    //   },
  ];

  const handleDeleteProduct = (categoryId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(categoryDelete(categoryId));
        Swal.fire("Deleted!", "The Category has been deleted.", "success");
      }
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateCategory = (data: any) => {
    navigate(`/products/category/edit/${data.id}`);
  };

  const handleSearch = () => {
    // e: React.KeyboardEvent<HTMLInputElement>
    // if (e.key === "Enter") {
      dispatch(
        getCategoryList({
          page: 1,
          limit,
          searchTerm: searchValue,
          type: 'no_filter'
        })
      );
    // }
  };
  const handlePageClick = (data: any) => {
    dispatch(
      getCategoryList({
        page: data.selected + 1,
        limit,
        searchTerm: searchValue,
        type: 'all'
      })
    );
    // setSelectedPage(data.selected + 1);
  };
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start text-black dark:text-white h-screen">
      <div className="m-3">
        <div className="flex justify-between items-center">
          <div className="relative md:w-1/3 my-2">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 ">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
              id="simple-search"
              className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  "
              placeholder="Search here.."
            />
          </div>
          <button
            onClick={() => navigate("/products/category/add")}
            type="button" // Use type="button" to prevent form submission
            className=" bg-slate-200 dark:bg-slate-600 w-full xl:w-auto flex items-center justify-center gap-2 rounded bg-primary py-3 px-6 font-medium dark:text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Category
          </button>
        </div>
        <Table
          columns={columns}
          data={categoryList.data || []}
          isAction={true}
          onDelete={handleDeleteProduct}
          onEdit={handleUpdateCategory}
        />
      </div>
      <div className="mt-8 flex justify-end">
        <Pagination
          pageCount={categoryList?.total && Math.ceil(categoryList?.total / limit)}
          handlePageClick={handlePageClick}
          pageRange={2}
        />
      </div>
    </div>
  );
};

export default CategoryList;

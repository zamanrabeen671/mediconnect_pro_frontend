import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Table from "../../components/Common/TableComponent";
import Pagination from "../../components/Common/Pagination";
import { useNavigate } from "react-router";
import { getCustomerList } from "../../store/API/customerApi";


export const WarrentyList = [
  { name: "Active", id: "active" },
  // { name: "Expired", id: "expired" },
];

const CustomerList = () => {
  const { customerList } = useAppSelector((state) => state.product);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
 
  const [limit, setLimit] = useState(10);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getCustomerList({
        searchTerm: searchValue,
        page: 1,
        limit,
      })
    );
  }, [dispatch]);

  const handleSearch = () => {
    // e: React.KeyboardEvent<HTMLInputElement>
    // if (e.key === "Enter") {
    dispatch(
      getCustomerList({
        page: 1,
        limit: limit,
        searchTerm: searchValue
      })
    );
    // }
  };
  const handleLimitChange = (data: number) => {
    setLimit(data);
    dispatch(
      getCustomerList({
        page: 1,
        limit: data,
        searchTerm: searchValue
      })
    );
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (data: any) => {
    dispatch(
      getCustomerList({
        page: data.selected + 1,
        limit,
        searchTerm: searchValue
      })
    );
    // setSelectedPage(data.selected + 1);
  };

  
  const handleViewExpense = (id: number) => {
    navigate(`/sale/details/${id}`);
  };

  
  const columns = [
    { header: "Sale Date", accessor: "saleDate" },
    { header: "Customer Name", accessor: "customerName" },
    { header: "Customer Phone", accessor: "customerPhone" },
    { header: "Invoice Number", accessor: "invoiceNumber" },
    { header: "Order Status", accessor: "orderStatus" },
    { header: "Payment Method", accessor: "paymentMethod" },
    { header: "Grand Total", accessor: "price" },
    { header: "Due", accessor: "dueAmount" },
    {
      header: "Added By",
      accessor: (item: any) =>
        `${item?.user?.first_name} ${item?.user?.last_name}`,
    },
  ];

  
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start text-black dark:text-white h-screen ">
      <div className="m-3">
        {/* <p className="text-center">Product List</p> */}
        <div className="flex items-center">
          {/* search bar */}
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
          {/*  status select box*/}
          
        </div>
        <Table
          columns={columns}
          data={customerList.data || []}
          isAction={true}
          onView={handleViewExpense}
        //   onDelete={handleDeletePurchase}

         
        />
        {/* <div className="mt-8 flex justify-end" key={remountComponent}> */}
        <div className="mt-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label
              htmlFor="limit"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Items per page:
            </label>
            <select
              id="limit"
              value={limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="block w-20 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm dark:bg-gray-800 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <Pagination
            pageCount={
              customerList?.total && Math.ceil(customerList?.total / limit)
            }
            handlePageClick={handlePageClick}
            pageRange={2}
          />
        </div>
      </div>
     
    </div>
  );
};

export default CustomerList;

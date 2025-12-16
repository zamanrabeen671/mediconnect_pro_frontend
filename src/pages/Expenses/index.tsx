/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Table from "../../components/Common/TableComponent";
import Pagination from "../../components/Common/Pagination";
import {
  createExpenses,
  deleteExpenses,
  getExpensesDownloadList,
  getExpensesList,
  updateExpenses,
} from "../../store/API/expensesApi";
import moment from "moment";
import ExpensesControlModal from "../../components/Expenses/ExpensesControlModal";
import { getCategoryList } from "../../store/API/categoryApi";
import { ExpensesType } from "../../models";
import { convertToCSV } from "../../utils/helperFunciton";

const ExpensesList = () => {
  const { expensesList } = useAppSelector((state) => state.expenses);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMood, setIsEditMood] = useState(false);
  const [expensesValue, setExpensesValue] = useState<ExpensesType>({});
  const [searchValue, setSearchValue] = useState("");
  const limit = 10;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getExpensesList({}));
  }, [dispatch]);

  const columns = [
    { header: "Category", accessor: (item: any) => item?.category?.name },
    { header: "Amount", accessor: "amount" },
    { header: "Notes", accessor: "notes" },
    {
      header: "Date",
      accessor: (item: any) => moment(item?.date).format("MMMM Do YYYY"),
    },
    { header: "Created By", accessor: (item: any) => item?.user?.first_name },
  ];
  const handlePageClick = (data: any) => {
    dispatch(
      getCategoryList({
        page: data.selected + 1,
        limit,
      })
    );
    // setSelectedPage(data.selected + 1);
  };
  const handlExpensesDelete = (id: any) => {
    dispatch(deleteExpenses(id));
  };

  const handleEditExpenses = (data: any) => {
    setExpensesValue(data);
    setModalOpen(true);
    setIsEditMood(true);
  };

  const handleExpensesCreateEditSubmit = (data: any) => {
    if (isEditMood) {
      dispatch(
        updateExpenses({
          ...data,
          id: (expensesValue as any).id,
          categoryId: data.category.value,
        })
      );
    } else {
      dispatch(
        createExpenses({
          ...data,
          categoryId: data.category.value,
        })
      );
    }
    setModalOpen(false);
    setIsEditMood(false);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(
        getExpensesList({
          page: 1,
          limit: limit,
          searchTerm: searchValue,
          //   brand: selectedBrand,
          //   category: selectedCategory,
        })
      );
    }
  };

  const downloadCSV = async () => {
    const pl = await dispatch(
      getExpensesDownloadList({
        user_type: "approved",
      })
    );
    const sanitizedData = pl.payload.map((item: any) => {
      const newItem = {
        date: item.date,
        amount: item.amount,
        category: item.category?.name,
        notes: item.notes,
        addedBy: `${item.user?.first_name} ${item.user?.last_name}`,
      };
      return newItem;
    });

    const csvData = convertToCSV(sanitizedData);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `expenses list ${moment().format("hhmmssddmmyy")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start text-black dark:text-white h-screen">
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
          <div className="mx-2">
            <div className="flex  justify-end">
              <button
                onClick={() => {
                  setIsEditMood(false);
                  setModalOpen(true);
                  setExpensesValue({});
                }}
                type="button" // Use type="button" to prevent form submission
                className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white w-full xl:w-auto flex items-center justify-center gap-2 rounded bg-primary py-3 px-6 font-medium  hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark"
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
                Add Expenses
              </button>
            </div>
          </div>
          <div className="mx-2">
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition active:scale-95"
            >
              Download
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          data={expensesList.data || []}
          // onView={handleViewProduct}
          onDelete={handlExpensesDelete}
          onEdit={handleEditExpenses}
          isAction
        />
        {/* <div className="mt-8 flex justify-end" key={remountComponent}> */}
        <div className="mt-8 flex justify-end">
          <Pagination
            pageCount={
              expensesList?.total && Math.ceil(expensesList?.total / limit)
            }
            handlePageClick={handlePageClick}
            pageRange={2}
          />
        </div>
      </div>
      <ExpensesControlModal
        modelOpen={modalOpen}
        setModelOpen={setModalOpen}
        onSubmit={handleExpensesCreateEditSubmit}
        expensesProps={expensesValue}
        isEditMood={isEditMood}
      />
    </div>
  );
};

export default ExpensesList;

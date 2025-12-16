/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteUser, getUserList } from "../../store/API/userApis";
import { useNavigate } from "react-router";
import Table from "../../components/Common/TableComponent";
import Pagination from "../../components/Common/Pagination";

const UserList = () => {
  const { userList } = useAppSelector((state) => state.auth);
  console.log(userList);
  const limit = 10;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserList({}));
  }, [dispatch]);

  const columns = [
    { header: "First Name", accessor: "first_name" },
    { header: "Last Name", accessor: "last_name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: (item: any) => item?.role?.name },
  ];
  const handlePageClick = (data: any) => {
    dispatch(
      getUserList({
        page: data.selected + 1,
        limit,
      })
    );
    // setSelectedPage(data.selected + 1);
  };
  const handleRoleDelete = (id: any) => { 
      console.log(id);
      dispatch(deleteUser(id));
  }
  
  const handleEditUser = (user: any) => { 
    console.log(user);
    navigate(`/user/edit/${user.id}`);
  }
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start text-black dark:text-white h-screen">
      <div className="m-3">
        {/* <p className="text-center">Product List</p> */}
        <div className="flex items-center">
          {/* search bar */}
          {/* <div className="relative md:w-1/3 my-2">
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
          </div> */}
          {/*  status select box*/}
          <div className="mx-2">
            <div className="flex  justify-end">
              <button
                onClick={() => navigate("/user/create")}
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
                Add User
              </button>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={userList.users || []}
          // onView={handleViewProduct}
          isAction
          onDelete={handleRoleDelete}
          onEdit={handleEditUser}
        />
        {/* <div className="mt-8 flex justify-end" key={remountComponent}> */}
        <div className="mt-8 flex justify-end">
          <Pagination
            pageCount={userList?.total && Math.ceil(userList?.total / limit)}
            handlePageClick={handlePageClick}
            pageRange={2}
          />
        </div>
      </div>
    </div>
  );
};

export default UserList;

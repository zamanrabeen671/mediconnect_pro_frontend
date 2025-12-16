/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createPermission, deletePermission, getPermissionList } from "../../store/API/userApis";
import Table from "../../components/Common/TableComponent";
import PermissionControlModal from "../../components/Permission/PermissionControlModal";

const PermissionList = () => {
  const { permissionList } = useAppSelector((state) => state.auth);
const [modalOpen, setModalOpen] = useState(false);
  //   const navigate = useNavigate();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPermissionList());
  }, [dispatch]);

  const handleDeletePermission = (id: number) => {
    dispatch(deletePermission(id));
  };

  const handleCreatePermission = (data:any) => { 
    dispatch(createPermission(data));
    setModalOpen(false);
  }

  const columns = [{ header: "Permission Name", accessor: "name" }];
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start text-black dark:text-white h-screen">
      <div className="m-3">
        {/* <p className="text-center">Product List</p> */}
        <div className="flex items-center">
          {/*  status select box*/}
          <div className="mx-2">
            <div className="flex  justify-end">
              <button
                onClick={() => {
                  setModalOpen(true);
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
                Add Permission
              </button>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={permissionList || []}
          // onView={handleViewProduct}
          isAction={true}
          onDelete={handleDeletePermission}
          // onEdit={handleEditProduct}
        />
      </div>
      <PermissionControlModal
        modelOpen={modalOpen}
        setModelOpen={setModalOpen}
        onSubmit={handleCreatePermission}
      />
    </div>
  );
};

export default PermissionList;

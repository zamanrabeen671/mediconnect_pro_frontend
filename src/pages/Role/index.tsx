/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { createRolePermissions, deleteRole, getPermissionList, getRoleList, updateRolePermissions } from "../../store/API/userApis";
import Table from "../../components/Common/TableComponent";
import RolePermissionControlModal from "../../components/Role/RolePermissionControlModal";

const RoleList = () => {
  const { roleList, permissionList } = useAppSelector((state) => state.auth);
  const [roleValue, setRoleValue] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMood, setIsEditMood] = useState(false);


  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(getRoleList());
      dispatch(getPermissionList());
  }, [dispatch]);

  const columns = [
    { header: "Role Name", accessor: "name" },
    {
      header: "Permissions",
      accessor: (item: any) =>
        item?.permissions.map((permission: any) => permission.name).join(", "),
    },
  ];
  const handleEditRole = (role: any) => {
    console.log(role);
    setRoleValue(role);
    setModalOpen(true);
    setIsEditMood(true);
  };

  const handleRoleEditSubmit = (data: any) => {
    console.log(data);
    if (isEditMood) {
      dispatch(
        updateRolePermissions({
          ...data,
          id: (roleValue as any).id,
          permissions: data.permissions.map((perm: any) => perm.value),
        })
      );
    } else {
      dispatch(
        createRolePermissions({
          ...data,
          permissions: data.permissions.map((perm: any) => perm.value),
        })
      );
    }
    
    setModalOpen(false);
    setIsEditMood(false);
  };

  const handleRoleDelete = (id: any) => { 
    console.log(id);
    dispatch(deleteRole(id));
  }
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
                  setIsEditMood(false);
                  setRoleValue({});
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
                Add Role
              </button>
            </div>
          </div>
        </div>
        <Table
          columns={columns}
          data={roleList || []}
          // onView={handleViewProduct}
          onDelete={handleRoleDelete}
          onEdit={handleEditRole}
          isAction
        />
      </div>
      <RolePermissionControlModal
        permissions={permissionList}
        roleProps={roleValue}
        modelOpen={modalOpen}
        setModelOpen={setModalOpen}
        onSubmit={handleRoleEditSubmit}
      />
    </div>
  );
};

export default RoleList;

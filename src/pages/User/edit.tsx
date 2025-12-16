/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getUserDetails, userUpdate } from "../../store/API/userApis";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import UserCreateEditForm from "../../components/User/UserCreateEditForm";

const EditUser = () => {
  const { userDetails } = useAppSelector((state) => state.auth);
  console.log(userDetails);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(getUserDetails(id));
  }, [id, dispatch]);

  const onSubmit = (data: any) => {
    dispatch(
      userUpdate({
        postData: {
          id: id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          role: data.role.value,
        },
        router: navigate,
      })
    );
  };
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start justify-start min-h-screen">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-gray-800 w-full">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-semibold text-black dark:text-white">
            Edit User
          </h3>
        </div>
        <UserCreateEditForm
          onSubmit={onSubmit}
          userDetails={userDetails}
          editForm
        />
        {/* <ProductCreateUpdateForm onSubmit={onSubmit} /> */}
      </div>
    </div>
  );
};

export default EditUser;

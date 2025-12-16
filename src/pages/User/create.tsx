/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import UserCreateEditForm from "../../components/User/UserCreateEditForm";
import { userCreate } from "../../store/API/userApis";
import { useAppDispatch } from "../../store/hooks";

const CreateUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    dispatch(
      userCreate({
        postData: {...data, role: data.role.value},
        router: navigate,
      })
    );
  };
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start justify-start min-h-screen">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-gray-800 w-full">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-semibold text-black dark:text-white">
            Create User
          </h3>
        </div>
        <UserCreateEditForm onSubmit={onSubmit} />
        {/* <ProductCreateUpdateForm onSubmit={onSubmit} /> */}
      </div>
    </div>
  );
};

export default CreateUser;

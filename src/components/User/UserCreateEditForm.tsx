/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
// import { UserType } from "../../models";
// import Selector from "../Common/Select";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getRoleList } from "../../store/API/userApis";
import { UserType } from "../../models";
import Select from "react-select";

const UserCreateEditForm = ({
  onSubmit,
  userDetails,
  editForm,
}: //   userDetailsProps,
{
  onSubmit: (data: any) => void;
  userDetails?: UserType;
  editForm?: boolean;
  //   userDetailsProps?: UserType;
}) => {
  const { roleList } = useAppSelector((state) => state.auth);
  const {
    register,
    setValue,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getRoleList());
  }, [dispatch]);
  useEffect(() => {
    if (userDetails) {
      setValue("first_name", userDetails.first_name);
      setValue("last_name", userDetails.last_name);
      setValue("email", userDetails.email);
      setValue("role", {
        value: userDetails.role?.id,
        label: userDetails.role?.name,
      });
    }
  }, [userDetails, setValue]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 text-black dark:text-white">
        <div className="mb-4 flex flex-col">
          <div className="mb-4 flex gap-6 flex-col md:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                First Name
              </label>
              <input
                {...register("first_name", { required: true })}
                type="text"
                placeholder="First name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.first_name && (
                <p className="text-red-500 text-start text-xs">
                  This field is required.
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Last Name
              </label>
              <input
                {...register("last_name", { required: true })}
                type="text"
                placeholder="Last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.last_name && (
                <p className="text-red-500 text-start text-xs">
                  This field is required.
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="Email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.email && (
                <p className="text-red-500 text-start text-xs">
                  This field is required.
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 flex gap-6 flex-col md:flex-row">
            {editForm ? null : (
              <>
                <div className="w-full xl:w-1/3">
                  <label className="mb-[10px] block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: editForm ? false : true,
                    })}
                    type="text"
                    placeholder="Password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors?.password && (
                    <p className="text-red-500 text-start text-xs">
                      This field is required.
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/3">
                  <label className="mb-[10px] block text-black dark:text-white">
                    Re-Type Password
                  </label>
                  <input
                    {...register("password_confirm", {
                      required: editForm ? false : true,
                    })}
                    type="text"
                    placeholder="Re-Type Password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors?.password_confirm && (
                    <p className="text-red-500 text-start text-xs">
                      This field is required.
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Role
              </label>

              {/* <Selector
                register={register}
                setValue={setValue}
                watch={watch}
                name="role"
                list={roleList.map((role) => ({
                  name: role.name ?? "",
                  id: role.id ? String(role.id) : "",
                }))}
              /> */}

              <Controller
                name="role"
                render={({ field }) => (
                  <Select
                    {...field}
                    options={
                      roleList?.map((i) => ({
                        value: (i.id || "").toString(),
                        label: i.name || "",
                      })) || []
                    }
                    // styles={customStyles}
                    className="mt-1"
                    isSearchable={true}
                    isClearable
                    // isDisabled={res_id || vendor ? true : false}
                  />
                )}
                control={control}
                rules={{ required: true }}
              />

              {errors?.role && (
                <p className="text-red-500 text-start text-xs">
                  This field is required.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className=" px-6 rounded bg-blue-600 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserCreateEditForm;

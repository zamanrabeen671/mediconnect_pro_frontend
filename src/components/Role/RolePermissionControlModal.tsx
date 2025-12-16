/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import ModalContainer from "../Common/ModalContainer";
import { PermissionType, RoleType } from "../../models";
import { useEffect } from "react";
import Select from "react-select";

interface ModalProps {
  modelOpen: boolean;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: any) => void;
  roleProps?: RoleType;
  permissions: PermissionType[];
}

const RolePermissionControlModal: React.FC<ModalProps> = ({
  modelOpen,
  setModelOpen,
  onSubmit,
  roleProps,
  permissions,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();

  useEffect(() => {
    if (roleProps) {
      setValue("name", roleProps.name);
      if (roleProps.permissions && permissions.length) {
        // Filter permissions based on roleProps.permissions
        const filteredPermissions = permissions
          .filter(
            (perm) =>
              perm.id !== undefined &&
              roleProps?.permissions?.some(
                (rp) => rp.id !== undefined && rp.id === perm.id
              )
          )
          .map((perm) => ({
            value: perm.id!.toString(), // Using non-null assertion as it's checked above
            label: perm.name || "",
          }));

        setValue("permissions", filteredPermissions);
      }
    }
  }, [roleProps, setValue, permissions]);

  return (
    <ModalContainer open={modelOpen} closeModal={() => setModelOpen(false)}>
      <div className="pr_overlay fixed left-0 top-0 h-full w-full overflow-x-hidden overflow-y-auto bg-[rgba(0,0,0,0.5)] z-20">
        <div className="modal_dialog relative w-auto transform-none xl:max-w-[1000px] lg:max-w-[950px] md:max-w-[700px] sm:max-w-[500px] xs:max-w-[400px] xxs:max-w-[340px] sm:min-h-[calc(100%_-_3.5rem)] min-h-[calc(100%_-_1rem)] flex items-center my-8 mx-auto">
          <div className="bg-white relative flex flex-col w-full pointer-events-auto bg-clip-padding rounded-lg p-6">
            <span
              className="inline-flex justify-center items-center h-8 w-8 rounded-full bg-black bg-opacity-80 absolute -top-1 -right-1 z-50 cursor-pointer"
              id="em_close"
              onClick={() => setModelOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
            <div className="e_modal_body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-text text-center pt-4">
                  <h1 className="font-bold mb-3">Role Permission</h1>

                  <div className="input_group md:col-span-4 col-span-3 w-full md:w-2/3 mx-auto">
                    <input
                      // value={subject}
                      // onChange={(e) => setSubject(e.target.value)}
                      {...register("name", { required: true })}
                      type="text"
                      className="border-[.5px] border-black 2xl:h-[45px] h-10 p-2 rounded-md w-full focus:ring-transparent focus:border-primary_color"
                      placeholder="Subject of the question"
                    />
                    {errors?.name && (
                      <p className="text-red-500 text-start text-xs">
                        This field is required.
                      </p>
                    )}
                  </div>
                  <div className="input_group md:col-span-4 col-span-3 w-full md:w-2/3 mx-auto">
                    <label className="mb-[10px] block text-black dark:text-white">
                      Permissions
                    </label>
                    <Controller
                      name="permissions"
                      render={({ field }) => (
                        <Select
                          isMulti
                          {...field}
                          options={
                            permissions?.map((i) => ({
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

                    {/* <Selector
                      isMultiple
                      register={register}
                      setValue={setValue}
                      watch={watch}
                      name="Permissions"
                      list={
                        permissions?.map((i) => ({
                          id: (i.id || "").toString(),
                          name: i.name || "",
                        })) || []
                      }
                    /> */}
                  </div>
                </div>
                <div className="input_btn text-center sm:w-[112px] mx-auto mt-24 md:mt-20 w-full">
                  <button
                    // onClick={handleSubmitQuestion}
                    type="submit"
                    id="mail_change_btn"
                    className="bg-green-500 text-black 2xl:text-lg text-base 2xl:h-[45px] h-10 px-2 w-full rounded-md hover:bg-theme_color transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default RolePermissionControlModal;

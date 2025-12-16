/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useForm } from "react-hook-form";
import { brandUpdate, getBrandDetails } from "../../store/API/brandApi";
import { useEffect } from "react";

const BrandEdit = () => {
  const { brandDetails } = useAppSelector((state) => state.brand);
  console.log(brandDetails);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(getBrandDetails(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (brandDetails) {
      setValue("name", brandDetails.name);
    }
  }, [brandDetails, setValue]);

  const onSubmit = (data: any) => {
    console.log(data);

    dispatch(
      brandUpdate({
        postData: {...data, id: brandDetails.id},
        router: navigate,
      })
    );
  };
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-gray-800 w-full">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-semibold text-black dark:text-white">
            Brand Category
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 text-black dark:text-white">
            <div className="mb-4 flex flex-col">
              <div className="mb-4 flex gap-6 flex-col md:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-[10px] block text-black dark:text-white">
                    Name
                  </label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Enter name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                  {errors?.name && (
                    <p className="text-red-500 text-start text-xs">
                      This field is required.
                    </p>
                  )}
                </div>
                <div className="mb-4 mt-8 w-full xl:w-1/2">
                  <button
                    type="submit"
                    className=" px-8 rounded bg-blue-600 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandEdit;

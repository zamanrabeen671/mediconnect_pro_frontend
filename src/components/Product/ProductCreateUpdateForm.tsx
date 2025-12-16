/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getBrandList } from "../../store/API/brandApi";
import { getCategoryList } from "../../store/API/categoryApi";
import { ProductType } from "../../models";
// import Select from 'react-select'
import Selector from "../Common/Select";

const units = [
  {
    id: 'Kg',
    name: 'Kg'
  },
  {
    id: 'Liter',
    name: 'Liter'
  },
  {
    id: 'Pc',
    name: 'Pc'
  },
  {
    id: 'Meter',
    name: "Meter"
  },
  {
    id: 'Inch',
    name: 'Inch'
  }
]

const ProductCreateUpdateForm = ({
  onSubmit,
  productDetailsProps,
}: {
  onSubmit: (data: any) => void;
  productDetailsProps?: ProductType;
}) => {
  const dispatch = useAppDispatch();
  const { register, setValue, watch, formState: { errors }, handleSubmit, } = useForm();

  const { brandList } = useAppSelector((state) => state.brand);
  const { categoryList } = useAppSelector((state) => state.category);
  const limit = 100
  useEffect(() => {
    dispatch(getBrandList({page: 1, limit}));
    dispatch(getCategoryList({page: 1, limit}));
  }, [dispatch]);



  useEffect(() => {
    if (productDetailsProps) {
      (Object.keys(productDetailsProps) as Array<keyof ProductType>).forEach(
        (key) => {
          setValue(key, productDetailsProps[key]);
        }
      );
      if (productDetailsProps?.category) {
        setValue("category", productDetailsProps?.category?.id);
      }
      if (productDetailsProps?.brand) {
        setValue("brand", productDetailsProps?.brand?.id);
      }
    }
  }, [productDetailsProps, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 text-black dark:text-white">
        <div className="mb-4 flex flex-col">
          <div className="mb-4 flex gap-6 flex-col md:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Product Name
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
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Category
              </label>
              
              <Selector register={register} setValue={setValue} watch={watch} name="category" list={categoryList.data as any} />

              {errors?.category && (
                <p className="text-red-500 text-start text-xs">
                  This field is required.
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Brand
              </label>
              
              <Selector register={register} setValue={setValue} watch={watch} name="brand" list={brandList.data as any} />

              {errors?.brand && (
                <p className="text-red-500 text-start text-xs">
                  This field is required.
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 flex gap-6 flex-col md:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Upload Image
              </label>
              <input
                type="file"
                {...register("image", { required: false })}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary file:mr-4 file:py-2 file:px-4 file:rounded file:border-[1.5px] file:border-stroke file:bg-transparent file:text-slate-400 file:cursor-pointer"
              />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Purchase Price
              </label>
              <input
                {...register("purchasePrice", { required: true })}
                type="number"
                placeholder="Enter Purchase Price"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.purchasePrice && (
                <p className="text-red-500 text-start text-xs">
                  This field is required.
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Sale Price
              </label>
              <input
                {...register("basePrice", { required: true })}
                type="number"
                placeholder="Enter Base Price"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.basePrice && (
                <p className="text-red-500 text-start text-xs">
                  This field is required.
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 flex gap-6 flex-col md:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Product Code
              </label>
              <input
                {...register("productCode", {
                  required: true,
                })}
                type="text"
                placeholder="Enter Product Code"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors?.productCode && (
                <p className="text-red-500 text-start text-xs">
                  Product Code is required.
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Unit
              </label>
              {/* <input
                {...register("unit")}
                type="text"
                placeholder="Enter Unit"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              /> */}

              <Selector register={register} setValue={setValue} watch={watch} name="unit" list={units} />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Discount
              </label>
              <input
                {...register("discount")}
                type="number"
                placeholder="Enter Discount"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
          <div className="mb-4 flex gap-6 flex-col md:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Tax Amount
              </label>
              <input
                {...register("taxAmount")}
                type="number"
                placeholder="Enter Tax Amount"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            <div className="w-full xl:w-2/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Enter Description"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            // onClick={handleSubmit}
            className=" px-6 rounded bg-blue-600 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductCreateUpdateForm;

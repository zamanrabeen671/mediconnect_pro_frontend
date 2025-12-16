import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalContainer from "./ModalContainer";
import Selector from "./Select";
import { OrderStatusList } from "../Purchase/PurchaseCreateUpdateForm";

interface ModalProps {
  modelOpen: boolean;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: any) => void;
  orderStatus: string;
  isEditMood: boolean;
}

const PaymentModalContainer: React.FC<ModalProps> = ({
  modelOpen,
  setModelOpen,
  onSubmit,
  // expensesProps,
  orderStatus,
  isEditMood,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm();


  useEffect(() => {
    if (orderStatus) {
     
      setValue("orderStatus", orderStatus);
    //   setValue("paymentDate", expensesProps.date);
    }
  }, [orderStatus, setValue]);

  const handleModalBehaviour = () => {
    reset(); // Reset the form when the modal closes
    setModelOpen(false)
  }

  return (
    <ModalContainer open={modelOpen} closeModal={handleModalBehaviour}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-600"
            onClick={handleModalBehaviour}
          >
            ✕
          </button>

          <h1 className="text-xl font-semibold text-center mb-6">
            {isEditMood ? "Edit Order Status" : "Create Expenses"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-[10px] block text-black dark:text-white">
                Order Status
              </label>
              <Selector
                register={register}
                setValue={setValue}
                watch={watch}
                name="orderStatus"
                list={OrderStatusList}
              />
            </div>

            {/* Date Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="relative">
                <input
                  {...register("paymentDate", { required: true })}
                  type="date"
                  className="w-full border border-gray-300 dark:bg-gray-700 bg-white rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-gray-400"
                />
                {/* Calendar Icon */}
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10m-11 10h12a2 2 0 002-2V7a2 2 0 00-2-2h-12a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              {errors?.date && (
                <p className="text-red-500 text-sm mt-1">
                  This field is required.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 transition-all w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalContainer>
  );
};

export default PaymentModalContainer;

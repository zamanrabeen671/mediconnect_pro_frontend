/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from "react-hook-form";
import ModalContainer from "../Common/ModalContainer";
import Select from "react-select";
import { ExpensesType } from "../../models";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCategoryList } from "../../store/API/categoryApi";

interface ModalProps {
  modelOpen: boolean;
  setModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: any) => void;
  expensesProps: ExpensesType;
  isEditMood: boolean;
}


const ExpensesControlModal: React.FC<ModalProps> = ({
  modelOpen,
  setModelOpen,
  onSubmit,
  expensesProps,
  isEditMood
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm();
  const { isDarkMode } = useAppSelector((state) => state.darkMode)
  const limit = 100;
  const dispatch = useAppDispatch();

  const { categoryList } = useAppSelector((state) => state.category)

  useEffect(() => {
    if (expensesProps) {
      setValue("category", {
        value: (expensesProps.category?.id || "").toString(),
        label: expensesProps.category?.name || "",
      });
      setValue("amount", expensesProps.amount);
      setValue("date", expensesProps.date);
      setValue("notes", expensesProps.notes);
    }
    dispatch(getCategoryList({ page: 1, limit, type: 'expenses' }));

  }, [expensesProps, setValue]);

  return (
    <ModalContainer open={modelOpen} closeModal={() => setModelOpen(false)}>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full max-w-lg p-6 relative">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-600"
            onClick={() => setModelOpen(false)}
          >
            ✕
          </button>

          <h1 className="text-xl font-semibold text-center mb-6">
            {isEditMood ? "Edit Expenses" : "Create Expenses"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Category Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={
                      categoryList.data?.map((i: any) => ({
                        value: (i.id || "").toString(),
                        label: i.name || "",
                      })) || []
                    }
                    styles={{
                      control: (base, { isFocused }) => ({
                        ...base,
                        borderWidth: "1.5px",
                        padding: "6px 10px",
                        borderColor: isFocused ? "#2563eb" : "#d1d5db", // Tailwind: primary and gray-300
                        boxShadow: isFocused ? "0 0 0 2px rgba(37, 99, 235, 0.5)" : "none",
                        backgroundColor: "transparent",
                        borderRadius: "0.375rem",
                        transition: "all 0.2s ease-in-out",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: isDarkMode ? "#1f2937" : "#e2e8f0", // dark: gray-800, light: slate-200
                        borderRadius: "0.375rem",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }),
                      option: (base, { isFocused, isSelected }) => ({
                        ...base,
                        backgroundColor: isSelected
                          ? "#2563eb" // Selected option background color
                          : isFocused
                            ? isDarkMode
                              ? "#475569" // Dark mode hover color
                              : "#cbd5e1" // Light mode hover color (slate-300)
                            : isDarkMode
                              ? "#475569" // Dark mode normal state
                              : "#ffffff", // Light mode normal state
                        // color: isSelected ? "#ffffff" : "#000000",
                        color: isDarkMode ? "#fff" : "#000",
                        padding: "10px",
                        cursor: "pointer",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: isDarkMode ? "#fff" : "#000",
                        fontWeight: "500",
                      }),
                    }}
                    className="mt-1 dark:bg-gray-700 bg-white"
                    isSearchable
                    isClearable
                  />
                )}
              />
              {errors?.category && (
                <p className="text-red-500 text-sm">This field is required.</p>
              )}
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                {...register("amount", {
                  required: true,
                  pattern: /^\d+(\.\d{1,2})?$/, // Allow up to 2 decimal places
                })}
                type="number"
                step="0.01"
                min="0"
                className="w-full border dark:bg-gray-700 bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-gray-400"
                placeholder="Enter amount"
              />
              {errors?.amount && (
                <p className="text-red-500 text-sm mt-1">
                  Enter a valid amount.
                </p>
              )}
            </div>

            {/* Date Input */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <div className="relative">
                <input
                  {...register("date", { required: true })}
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

            {/* Notes Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                {...register("notes", { required: true })}
                className="w-full border border-gray-300 dark:bg-gray-700 bg-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter notes"
                rows={3}
              ></textarea>
              {errors?.notes && (
                <p className="text-red-500 text-sm">This field is required.</p>
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

export default ExpensesControlModal;

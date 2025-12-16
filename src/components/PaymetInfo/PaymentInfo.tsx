/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Selector from "../Common/Select";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPaymentList } from "../../store/API/paymentApi";
import moment from "moment";

export const PMList = [
  { name: "Bkash", id: "bkash" },
  { name: "Nagad", id: "nagad" },
  { name: "Bank", id: "bank" },
  { name: "Cash", id: "cash" },
];

const getErrorMessage = (error: any): string | null => {
  if (!error) return null;
  if (typeof error.message === "string") return error.message;
  return null;
};

interface PaymentInfoProps {
  onSubmit: (data: any) => void;
  saleDetails: any;
  purchaseDetails: any;
  params: any;
}

const PaymentInfo = ({ onSubmit, saleDetails, purchaseDetails, params }: PaymentInfoProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const dispatch = useAppDispatch();
  const { paymentList } = useAppSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getPaymentList({ page: 1, limit: 20, searchTerm: "" }));
  }, [dispatch]);

  const handleFormSubmit = (formData: any) => {
    onSubmit(formData);
  };

  const totalAmount = params?.type === "sale" ? saleDetails?.price : purchaseDetails?.price;
  const dueAmount = params?.type === "sale" ? saleDetails?.dueAmount : purchaseDetails?.dueAmount;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Payment History Table */}
      {paymentList.data && paymentList.data.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border rounded shadow p-3 max-h-80 overflow-y-auto">
          <h4 className="text-lg font-semibold mb-3">Previous Payments</h4>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-900 font-semibold text-left">
                <th className="p-2 border-b">Paid Amount</th>
                <th className="p-2 border-b">Method</th>
                <th className="p-2 border-b">Type</th>
                <th className="p-2 border-b">Transaction ID</th>
                <th className="p-2 border-b">Payment Time</th>
              </tr>
            </thead>
            <tbody>
              {paymentList.data.map((payment: any) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{payment.amount}</td>
                  <td className="p-2 border-b capitalize">{payment.method}</td>
                  <td className="p-2 border-b">{payment.paymentFor}</td>
                  <td className="p-2 border-b">{payment.transactionId || "-"}</td>
                  <td className="p-2 border-b">
                    {moment(payment.paidAt).format("YYYY-MM-DD hh:mm:ss")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Payment Form */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded shadow text-black dark:text-white">
        <h4 className="text-xl font-semibold mb-4">Add New Payment</h4>

        <div className="mb-4 space-y-1 text-right text-sm">
          <p>
            <span className="font-medium">Total Amount:</span> {Number(totalAmount).toFixed(2)}
          </p>
          <p>
            <span className="font-medium">Due Amount:</span> {Number(dueAmount).toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Amount */}
          <div className="w-full md:w-1/3">
            <label className="block mb-1 font-medium">Payable Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              {...register("amount", { required: "Amount is required" })}
              className="w-full rounded border border-stroke bg-transparent py-3 px-4"
            />
            {getErrorMessage(errors.amount) && (
              <p className="text-red-500 text-xs mt-1">{getErrorMessage(errors.amount)}</p>
            )}
          </div>

          {/* Method */}
          <div className="w-full md:w-1/3">
            <label className="block mb-1 font-medium">Payment Method</label>
            <Selector
              name="method"
              list={PMList}
              register={register}
              setValue={setValue}
              watch={watch}
            />
          </div>

          {/* Transaction ID */}
          <div className="w-full md:w-1/3">
            <label className="block mb-1 font-medium">Transaction ID</label>
            <input
              type="text"
              placeholder="Transaction ID (if any)"
              {...register("transactionId", {
                maxLength: { value: 20, message: "Max 20 characters allowed" },
              })}
              className="w-full rounded border border-stroke bg-transparent py-3 px-4"
            />
            
          </div>

          {/* Notes */}
          <div className="w-full md:w-1/3">
            <label className="block mb-1 font-medium">Notes</label>
            <input
              type="text"
              placeholder="Payment notes (optional)"
              {...register("notes", {
                maxLength: { value: 255, message: "Max 255 characters allowed" },
              })}
              className="w-full rounded border border-stroke bg-transparent py-3 px-4"
            />
           
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PaymentInfo;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import { productSaleCreate } from "../../store/API/productApis";
import { useAppDispatch } from "../../store/hooks";
import ExpenseCreateUpdateForm from "../../components/Expense/ExpenseCreateUpdateForm";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { createCustomer } from "../../store/API/customerApi";
import { toast } from "react-toastify";

const ExpenseCreate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    let customerId = data.customerId;

    if (!customerId) {
      try {
        const newCustomer = await dispatch(
          createCustomer({
            name: data.customerName,
            phone: data.customerPhone,
            address: data.customerAddress,
          })
        ).unwrap();
        console.log(newCustomer);
        customerId = newCustomer.data.id;
      } catch (error) {
        toast.error(error as any);
        return;
      }
    }

    try {
      await dispatch(
        productSaleCreate({
          postData: {
            item: {
              customer: customerId,
              orderStatus: data.orderStatus,
              paymentMethod: data.paymentMethod,
              invoiceNumber:
                data.invoiceNumber ||
                uuidv4().replace(/-/g, "").substring(0, 10),
              saleDate: moment(data.saleDate).toDate(),
              paymentDate: moment(data.paymentDate).toDate(),
              price: data.price,
              receiveAmount: data.receiveAmount,
              dueAmount: data.dueAmount,
              product: data.products.map((item: any) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
                discount: item.discount,
                taxAmount: item.tax,
                warranty: item.warranty,
              })),
            },
          },
          router: navigate,
        })
      ).unwrap();
      // Optionally handle success: notify user, clear form, etc.
    } catch (error) {
      console.error("Failed to create product sale:", error);
      // Optionally handle error UI here
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start justify-start min-h-screen">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-gray-800 w-full">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-semibold text-black dark:text-white">
            Create Sale
          </h3>
        </div>
        <ExpenseCreateUpdateForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ExpenseCreate;

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { expenseEdit, getExpenseDetails } from "../../store/API/productApis";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import ExpenseCreateUpdateForm from "../../components/Expense/ExpenseCreateUpdateForm";

const SaleEdit = () => {
  const { expenseDetails } = useAppSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) dispatch(getExpenseDetails(id));
  }, [id, dispatch]);

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      expenseEdit({
        postData: {
          item: {
            id: data?.id,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            customerAddress: data.customerAddress,
            orderStatus: data.orderStatus,
            paymentMethod: data.paymentMethod,
            invoiceNumber: data.invoiceNumber
              ? data.invoiceNumber
              : uuidv4().replace(/-/g, "").substring(0, 10),
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
    );
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start justify-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-gray-800 w-full">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-semibold text-black dark:text-white">
            Edit Sale
          </h3>
        </div>
        <ExpenseCreateUpdateForm
          onSubmit={onSubmit}
          expenseDetails={expenseDetails}
        />
      </div>
    </div>
  );
};

export default SaleEdit;

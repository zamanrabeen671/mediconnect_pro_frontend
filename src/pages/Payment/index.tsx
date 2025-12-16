import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getExpenseDetails, getPurchaseDetails } from "../../store/API/productApis";
import PaymentInfo from "../../components/PaymetInfo/PaymentInfo";
import { paymentUpdate } from "../../store/API/paymentApi";

const Payment = () => {
  const { purchaseDetails } = useAppSelector((state) => state.product);
  const { expenseDetails } = useAppSelector((state) => state.product);
  const params:any = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(params)
  useEffect(() => {
    if (params.type === 'purchase') dispatch(getPurchaseDetails(params?.id));
    if (params.type === 'sale') dispatch(getExpenseDetails(params?.id));
  }, [params.id, dispatch]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      paymentUpdate({
        postData: {
          item: {
            amount: Number(data.amount),
            method: data.method,
            transactionId: data.transactionId,
            notes: data.notes,
            paymentFor: params.type,
            saleId: params.type === 'sale' ? params.id : null,
            purchaseId: params.type === 'purchase' ? params.id : null
            
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
            Edit Purchase
          </h3>
        </div>
        <PaymentInfo onSubmit={onSubmit} purchaseDetails={purchaseDetails} saleDetails={expenseDetails} params={params} />
      </div>
    </div>
  );
};

export default Payment;

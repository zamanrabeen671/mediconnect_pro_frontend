/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router";
import PurchaseCreateUpdateForm from "../../components/Purchase/PurchaseCreateUpdateForm";
import { productPurchaseCreate } from "../../store/API/productApis";
import { useAppDispatch } from "../../store/hooks";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";


const PurchaseCreate = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      productPurchaseCreate({
        postData: {
          item: {
            supplier: data.supplier,
            supplierPhone: data.supplierPhone,
            supplierAddress: data.supplierAddress,
            orderStatus: data.orderStatus,
            paymentMethod: data.paymentMethod,
            price: data.price,
            paidAmount: data.paidAmount,
            dueAmount: data.dueAmount,
            invoiceNumber: data.invoiceNumber ? data.invoiceNumber : uuidv4().replace(/-/g, "").substring(0, 10),
            purchaseDate: moment(data.purchaseDate).toDate(),
            paymentDate: moment(data.paymentDate).toDate(),
            product: data.products.map((item: any) => ({
              productId: item.id,
              quantity: item.quantity,
              price: item.price,
              discount: item.discount,
              taxAmount: item.tax,
            }))

          }
        },
        router: navigate,
      })
    );

  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start justify-start min-h-screen">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-gray-800 w-full">
        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
          <h3 className="font-semibold text-black dark:text-white">
            Create Purchase
          </h3>
        </div>
        <PurchaseCreateUpdateForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default PurchaseCreate

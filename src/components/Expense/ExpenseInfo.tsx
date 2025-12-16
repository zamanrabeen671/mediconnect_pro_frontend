import {  useAppSelector } from "../../store/hooks";
import moment from "moment";
import { IoMdCloudDownload } from "react-icons/io";
import { capitalizeFirstLetter } from "../../utils/helperFunciton";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import SaleInvoice from "../../pages/Sale/invoice";

const ExpenseInfo = () => {
  const { expenseDetails } = useAppSelector((state) => state.product);
  const [invoiceData, setInvoiceData] = useState<any>();

  const handleDownloadInvoice = async (data: any) => {
    try {
      // Dispatch the action to fetch the invoice
      setInvoiceData(data);
      setTimeout(() => {
        reactToPrintFn();
      }, 1000);
    } catch (error) {
      console.error('Error downloading invoice:', error);
    }
  };
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className="w-2/3 lg:w-2/3 mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Purchase Details */}
      <div style={{ visibility: "hidden", height: "0px", width: "0px" }}>
        <div ref={contentRef}>
          <SaleInvoice sale={invoiceData} />
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Expense Details</h2>
      <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
        <p><strong>Customer Name:</strong> {expenseDetails.customerName}</p>
        <p><strong>Customer Phone:</strong> {expenseDetails.customerPhone}</p>
        {/* <p><strong>Grand Total:</strong> ${expenseDetails?.price?.toFixed(2)}</p> */}
        <p><strong>Sale Date:</strong> {expenseDetails?.saleDate ? moment(expenseDetails?.saleDate as any).format('DD/MM/YYYY') : ''}</p>
        {expenseDetails.orderStatus !== "due" && (
                  <p>
                    <strong>Payment Date:</strong>{" "}
                    {expenseDetails?.paymentDate
                      ? moment(expenseDetails?.paymentDate as any).format(
                          "DD/MM/YYYY"
                        )
                      : ""}
                  </p>
                )}
        <p><strong>Order Status:</strong> <span className={`px-2 py-1 rounded ${expenseDetails.orderStatus === 'completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>{capitalizeFirstLetter(expenseDetails?.orderStatus as any)}</span></p>
        <p><strong>Payment Method:</strong> <span className={`px-2 py-1 rounded `}>{capitalizeFirstLetter(expenseDetails?.paymentMethod as any)}</span></p>
        <p><strong>Invoice Number:</strong> {expenseDetails.invoiceNumber}</p>
        <p><strong>Grand Total:</strong> {expenseDetails.price}</p>
        <p><strong>Added By:</strong> {`${expenseDetails?.user?.first_name} ${expenseDetails?.user?.last_name}`}</p>
        <button onClick={() => handleDownloadInvoice(expenseDetails)}
          className="w-48 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
        ><IoMdCloudDownload />Print invoice</button>
      </div>

      {/* Product Details */}
      <h3 className="text-xl font-semibold mb-3">Products</h3>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Product Category</th>
              <th className="p-2 border">Product Brand</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">warranty Issued</th>
            </tr>
          </thead>
          <tbody>
            {expenseDetails?.saleProducts?.map((product: any, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{product?.product.name}</td>
                <td className="p-2 border">{product?.product.category.name}</td>
                <td className="p-2 border">{product?.product.brand.name}</td>
                <td className="p-2 border">৳{Number(product?.price)?.toFixed(2)}</td>
                <td className="p-2 border">{product?.quantity}</td>
                <td className="p-2 border">৳{(product?.price * product?.quantity).toFixed(2)}</td>
                <td className="p-2 border">{moment(product?.warranty).format('DD/MM/YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseInfo;

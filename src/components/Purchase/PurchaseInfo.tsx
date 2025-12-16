import { useAppSelector } from "../../store/hooks";
import moment from "moment";
import { IoMdCloudDownload } from "react-icons/io";
import { capitalizeFirstLetter } from "../../utils/helperFunciton";
import PurchaseInvoice from "../../pages/Purchase/invoice";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const PurchaseInfo = () => {
  const { purchaseDetails } = useAppSelector((state) => state.product);
  const [purchaseData, setPurchaseData] = useState<any>();

  const handleDownloadInvoice = async (data: any) => {
    try {
      // Dispatch the action to fetch the invoice
      setPurchaseData(data);
      setTimeout(() => {
        reactToPrintFn();
      }, 1000);
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className="w-2/3 lg:w-2/3 mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Purchase Details */}
      <div style={{ visibility: "hidden", height: "0px", width: "0px" }}>
        <div ref={contentRef}>
          <PurchaseInvoice purchase={purchaseData} />
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Purchase Details</h2>
      <div className="grid grid-cols-2 gap-4 border-b pb-4 mb-4">
        <p>
          <strong>Supplier Name:</strong> {purchaseDetails.supplier}
        </p>
        <p>
          <strong>Supplier Phone:</strong> {purchaseDetails.supplierPhone}
        </p>
        {/* <p><strong>Grand Total:</strong> ${purchaseDetails?.price?.toFixed(2)}</p> */}
        <p>
          <strong>Purchase Date:</strong>{" "}
          {purchaseDetails?.purchaseDate
            ? moment(purchaseDetails?.purchaseDate as any).format("DD/MM/YYYY")
            : ""}
        </p>
        {purchaseDetails.orderStatus !== "due" && (
          <p>
            <strong>Payment Date:</strong>{" "}
            {purchaseDetails?.paymentDate
              ? moment(purchaseDetails?.paymentDate as any).format(
                  "DD/MM/YYYY"
                )
              : ""}
          </p>
        )}
        <p>
          <strong>Order Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded ${
              purchaseDetails.orderStatus === "completed"
                ? "bg-green-500 text-white"
                : "bg-yellow-500 text-white"
            }`}
          >
            {capitalizeFirstLetter(purchaseDetails.orderStatus as any)}
          </span>
        </p>
        <p>
          <strong>Payment Method:</strong>{" "}
          <span className={`px-2 pzy-1 rounded `}>
            {capitalizeFirstLetter(purchaseDetails.paymentMethod as any)}
          </span>
        </p>
        <p>
          <strong>Invoice Number:</strong> {purchaseDetails.invoiceNumber}
        </p>
        <p>
          <strong>Grand Total:</strong> {purchaseDetails.price}
        </p>
        <p>
          <strong>Added By:</strong>{" "}
          {`${purchaseDetails?.user?.first_name} ${purchaseDetails?.user?.last_name}`}
        </p>

        <button
          onClick={() => handleDownloadInvoice(purchaseDetails)}
          className="w-48 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          <IoMdCloudDownload />
          Print invoice
        </button>
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
            </tr>
          </thead>
          <tbody>
            {purchaseDetails?.purchaseProducts?.map((product: any, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{product?.product.name}</td>
                <td className="p-2 border">{product?.product.category.name}</td>
                <td className="p-2 border">{product?.product.brand.name}</td>
                <td className="p-2 border">
                  ৳{Number(product?.price)?.toFixed(2)}
                </td>
                <td className="p-2 border">{product?.quantity}</td>
                <td className="p-2 border">
                  ৳{(product?.price * product?.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseInfo;

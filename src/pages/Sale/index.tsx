import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  expenseDelete,
  getSaleDownload,
  productExpenseList,
} from "../../store/API/productApis";
import Table from "../../components/Common/TableComponent";
import Pagination from "../../components/Common/Pagination";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useReactToPrint } from "react-to-print";
import SaleInvoice from "./invoice";
import {
  OrderStatusList,
  PMList,
} from "../../components/Purchase/PurchaseCreateUpdateForm";
import moment from "moment";

export const WarrentyList = [
  { name: "Active", id: "active" },
  // { name: "Expired", id: "expired" },
];

const ExpenseList = () => {
  const { expenseList } = useAppSelector((state) => state.product);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [selectedPMType, setSelectedPMType] = useState("");
  const [warrantyType, setWarrantType] = useState("");
  const [invoiceData, setInvoiceData] = useState<any>();
  const [limit, setLimit] = useState(10);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      productExpenseList({
        page: 1,
        limit,
      })
    );
  }, [dispatch]);

  const handleSearch = () => {
    // e: React.KeyboardEvent<HTMLInputElement>
    // if (e.key === "Enter") {
    dispatch(
      productExpenseList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        orderStatus: selectedOrderType,
        paymentMethod: selectedPMType,
      })
    );
    // }
  };
  const handleLimitChange = (data: number) => {
    setLimit(data);
    dispatch(
      productExpenseList({
        page: 1,
        limit: data,
        searchTerm: searchValue,
        orderStatus: selectedOrderType,
        paymentMethod: selectedPMType,
      })
    );
  };
  const handleOrderStatus = (value: string) => {
    setSelectedOrderType(value);
    dispatch(
      productExpenseList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        orderStatus: value,
        paymentMethod: selectedPMType,
      })
    );
  };
  const handleWarranty = (value: string) => {
    setWarrantType(value);
    dispatch(
      productExpenseList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        orderStatus: selectedOrderType,
        warranty: value ?? undefined,
        paymentMethod: selectedPMType,
      })
    );
  };
  const handlePM = (value: string) => {
    setSelectedPMType(value);
    dispatch(
      productExpenseList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        orderStatus: selectedOrderType,
        warranty: value ?? undefined,
        paymentMethod: value,
      })
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageClick = (data: any) => {
    dispatch(
      productExpenseList({
        page: data.selected + 1,
        limit,
        searchTerm: searchValue,
        orderStatus: selectedOrderType,
        paymentMethod: selectedPMType,
      })
    );
    // setSelectedPage(data.selected + 1);
  };

  const handleDeletePurchase = (saleId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(expenseDelete({ saleId: saleId }));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };
  const handleViewExpense = (id: number) => {
    navigate(`/sale/details/${id}`);
  };

  const handleDownloadInvoice = async (data: any) => {
    setInvoiceData(data);
    setTimeout(() => {
      reactToPrintFn();
    }, 1000);
  };

  const convertToCSV = (json: any) => {
    if (!json.length) return "";

    const headers = Object.keys(json[0]).join(","); // Extract headers
    const rows = json.map((obj: any) =>
      Object.values(obj)
        .map((value) => `"${value}"`)
        .join(",")
    ); // Convert rows

    return [headers, ...rows].join("\n"); // Join all
  };

  const downloadCSV = async () => {
    const pl = await dispatch(
      getSaleDownload({
        user_type: "approved",
      })
    );
    const sanitizedData = pl.payload?.flatMap(
      (item: any) =>
        item.saleProducts?.map((saleProducts: any) => ({
          invoice: item.invoiceNumber,
          supplier: item.supplier,
          supplierPhone: item.supplierPhone,
          orderStatus: item.orderStatus,
          supplierAddress: item.supplierAddress,
          paymentMethod: item.paymentMethod,
          price: item.price,
          category: saleProducts.product?.category?.name,
          brand: saleProducts.product?.brand?.name,
          addedBy: `${item.user?.first_name} ${item.user?.last_name}`,
          productName: saleProducts.product?.name,
          productCode: saleProducts.product?.productCode,
          quantity: saleProducts.quantity,
          productPrice: saleProducts.price,
          receiveAmount: item.receiveAmount,
          dueAmount: Number(item.price) - Number(item.receiveAmount),
        })) || []
    );
    const csvData = convertToCSV(sanitizedData);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `sale list ${moment().format("hhmmssddmmyy")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  const columns = [
    { header: "Sale Date", accessor: "saleDate" },
    { header: "Customer Name", accessor: "customerName" },
    { header: "Customer Phone", accessor: "customerPhone" },
    { header: "Invoice Number", accessor: "invoiceNumber" },
    { header: "Order Status", accessor: "orderStatus" },
    { header: "Payment Method", accessor: "paymentMethod" },
    { header: "Grand Total", accessor: "price" },
    { header: "Due", accessor: "dueAmount" },
    {
      header: "Added By",
      accessor: (item: any) =>
        `${item?.user?.first_name} ${item?.user?.last_name}`,
    },
  ];
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleEditSale = (data: any) => {
    navigate(`/sale/edit/${data?.id}`);
  };
  const handlePaymentInfo = (data: any) => {
    navigate(`/payment/sale/${data.id}`)
  }
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start text-black dark:text-white h-screen ">
      <div style={{ visibility: "hidden", height: "0px", width: "0px" }}>
        <div ref={contentRef}>
          <SaleInvoice sale={invoiceData} />
        </div>
      </div>
      <div className="m-3">
        {/* <p className="text-center">Product List</p> */}
        <div className="flex items-center">
          {/* search bar */}
          <div className="relative md:w-1/3 my-2">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 ">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
              id="simple-search"
              className=" border border-gray-300 text-gray-900 rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  "
              placeholder="Search here.."
            />
          </div>
          {/*  status select box*/}
          <div className="mx-2">
            <div className="flex justify-center">
              <select
                value={selectedOrderType || ""}
                onChange={(e) => handleOrderStatus(e.target.value)}
                className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white 
                            border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
              >
                <option value="">Order Status</option>
                {OrderStatusList.map((od: any) => (
                  <option key={od?.id} value={od?.id}>
                    {od?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mx-2">
            <div className="flex justify-center">
              <select
                value={selectedPMType || ""}
                onChange={(e) => handlePM(e.target.value)}
                className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white 
                                      border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
              >
                <option value="">Payment Method</option>
                {PMList.map((pm: any) => (
                  <option key={pm?.id} value={pm?.id}>
                    {pm?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mx-2">
            <div className="flex justify-center">
              <select
                value={warrantyType || ""}
                onChange={(e) => handleWarranty(e.target.value)}
                className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white 
                            border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
              >
                <option value="">Warranty</option>
                {WarrentyList.map((wa: any) => (
                  <option key={wa?.id} value={wa?.id}>
                    {wa?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mx-2">
            <div className="flex  justify-end">
              <button
                onClick={() => navigate("/sale/create")}
                type="button" // Use type="button" to prevent form submission
                className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white w-full xl:w-auto flex items-center justify-center gap-2 rounded bg-primary py-3 px-6 font-medium  hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Sale
              </button>
            </div>
          </div>
          <div className="mx-2">
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition active:scale-95"
            >
              Download
            </button>
          </div>
        </div>
        <Table
          columns={columns}
          data={expenseList.data || []}
          isAction={true}
          onView={handleViewExpense}
          onDelete={handleDeletePurchase}
          invoice={handleDownloadInvoice}
          onEdit={handleEditSale}
          handlePaymentInfo={handlePaymentInfo}
        />
        {/* <div className="mt-8 flex justify-end" key={remountComponent}> */}
        <div className="mt-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <label
              htmlFor="limit"
              className="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Items per page:
            </label>
            <select
              id="limit"
              value={limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}
              className="block w-20 py-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm dark:bg-gray-800 dark:text-white"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <Pagination
            pageCount={
              expenseList?.total && Math.ceil(expenseList?.total / limit)
            }
            handlePageClick={handlePageClick}
            pageRange={2}
          />
        </div>
      </div>
     
    </div>
  );
};

export default ExpenseList;

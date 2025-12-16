/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPurchaseDownload, productPurchaseList, purchaseDelete } from "../../store/API/productApis";
import Table from "../../components/Common/TableComponent";
import Pagination from "../../components/Common/Pagination";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useReactToPrint } from "react-to-print";
import PurchaseInvoice from "../Purchase/invoice";
import { OrderStatusList, PMList } from "../../components/Purchase/PurchaseCreateUpdateForm";
import moment from "moment";

const PurchaseList = () => {
  const navigate = useNavigate();
  const { purchaseList } = useAppSelector((state) => state.product);
  const [invoiceData, setInvoiceData] = useState<any>();
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [selectedPMType, setSelectedPMType] = useState("");
  const [limit, setLimit] = useState(10);

  // console.log(purchaseList.data);

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      productPurchaseList({
        page: 1,
        limit,
      })
    );
  }, [dispatch]);

  const handleSearch = () => {
    // e: React.KeyboardEvent<HTMLInputElement>
    // if (e.key === "Enter") {
      dispatch(
        productPurchaseList({
          page: 1,
          limit: limit,
          searchTerm: searchValue,
          orderStatus: selectedOrderType,
          paymentMethod: selectedPMType

        })
      );
    // }
  };
  const handleOrderStatus = (value: string) => {
    setSelectedOrderType(value)
    dispatch(
      productPurchaseList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        orderStatus: value,
        paymentMethod: selectedPMType
      })
    );
  }
  const handlePM = (value: string) => {
    setSelectedPMType(value)
    dispatch(
      productPurchaseList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        orderStatus: selectedOrderType,
        paymentMethod: value
      })
    );
  }
  const handlePageClick = (data: any) => {
    dispatch(
      productPurchaseList({
        page: data.selected + 1,
        limit,
        searchTerm: searchValue,
        orderStatus: selectedOrderType,
        paymentMethod: selectedPMType

      })
    );
    // setSelectedPage(data.selected + 1);
  };
   const handleLimitChange = (data: number) => {
      setLimit(data);
      dispatch(
        productPurchaseList({
          page: 1,
          limit: data,
          searchTerm: searchValue,
          orderStatus: selectedOrderType,
          paymentMethod: selectedPMType
  
        })
      );
    };
  const handleViewPurchase = (id: number) => {
    navigate(`/purchase/details/${id}`);
  };
  const handleDeletePurchase = (purchaseId: number) => {
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
        dispatch(purchaseDelete({ purchasesId: purchaseId }));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };
  const handleDownloadInvoice = async (data: any) => {
    // console.log(data);
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
      getPurchaseDownload({
        user_type: "approved",
      })
    );
    const sanitizedData = pl.payload?.flatMap((item: any) =>
      item.purchaseProducts?.map((purchaseProduct: any) => ({
        invoice: item.invoiceNumber,
        supplier: item.supplier,
        supplierPhone: item.supplierPhone,
        orderStatus: item.orderStatus,
        supplierAddress: item.supplierAddress,
        price: item.price,
        category: purchaseProduct.product?.category?.name,
        brand: purchaseProduct.product?.brand?.name,
        addedBy: `${item.user?.first_name} ${item.user?.last_name}`,
        productName: purchaseProduct.product?.name,
        productCode: purchaseProduct.product?.productCode,
        quantity: purchaseProduct.quantity,
        productPrice: purchaseProduct.price,
        paidAmount: Number(item.paidAmount),
        dueAmount: Number(item.price) - Number(item.paidAmount),
      })) || []
    );
    const csvData = convertToCSV(sanitizedData);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `purchase list ${moment().format('hhmmssddmmyy')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

  };
  const columns = [
    { header: "Purchase Date", accessor: "purchaseDate" },
    { header: "Supplier Name", accessor: "supplier" },
    { header: "Supplier Phone", accessor: "supplierPhone" },
    { header: "Invoice Number", accessor: "invoiceNumber" },
    { header: "Payment Method", accessor: "paymentMethod" },
    { header: "Order Status", accessor: "orderStatus" },
    { header: "Grand Total", accessor: "price" },
    { header: "Due", accessor: "dueAmount" },
    {
      header: "Added By",
      accessor: (item: any) => `${item?.user?.first_name} ${item?.user?.last_name}`,
    },
  ];

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleEditPurchase = (data: any) => {
    navigate(`/purchase/edit/${data?.id}`);
  };
  const handlePaymentInfo = (data: any) => {
    navigate(`/payment/purchase/${data.id}`)
  }
  return (
    <div className="flex flex-col gap-4 px-4 pt-6 text-start text-black dark:text-white h-screen">
      <div style={{ visibility: "hidden", height: "0px", width: "0px" }}>
        <div ref={contentRef}>
          <PurchaseInvoice purchase={invoiceData} />
        </div>
      </div>
      <div className="m-3">
        {/* <p className="text-center">Product List</p> */}
        <div className="flex items-center overflow-y-hidden">
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
                value={selectedOrderType || ''}
                onChange={(e) => handleOrderStatus(e.target.value)}
                className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white 
                            border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
              >
                <option value="">
                  Order Status
                </option>
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
                value={selectedPMType || ''}
                onChange={(e) => handlePM(e.target.value)}
                className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white 
                            border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
              >
                <option value="">
                  Payment Method
                </option>
                {PMList.map((pm: any) => (
                  <option key={pm?.id} value={pm?.id}>
                    {pm?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mx-2">
            <div className="flex  justify-end">
              <button
                onClick={() => navigate("/purchase/create")}
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
                Add Purchase
              </button>

            </div>

          </div>
          <div className="mx-2">

            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition active:scale-95">
              Download</button>
          </div>
        </div>
        <Table
          columns={columns}
          data={purchaseList.data || [] as any}
          isAction={true}
          onView={handleViewPurchase}
          onDelete={handleDeletePurchase}
          invoice={handleDownloadInvoice}
          onEdit={handleEditPurchase}
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
              purchaseList?.total && Math.ceil(purchaseList?.total / limit)
            }
            handlePageClick={handlePageClick}
            pageRange={2}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseList;

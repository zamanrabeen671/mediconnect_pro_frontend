/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProductStockList, getStockList } from "../../store/API/productApis";
import Table from "../../components/Common/TableComponent";
import Pagination from "../../components/Common/Pagination";
import { getCategoryList } from "../../store/API/categoryApi";
import { getBrandList } from "../../store/API/brandApi";
import moment from "moment";

const StockList = () => {
  const dispatch = useAppDispatch();

  const { deleteProduct, stockList } = useAppSelector((state) => state.product);
  const { categoryList } = useAppSelector((state) => state.category);
  const { brandList } = useAppSelector((state) => state.brand);

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [stockSelect, setStockSelect] = useState("");

  // const displayProducts = (searchProducts?.data as any)?.length > 0 ? searchProducts.data : products.data;

  const [limit, setLimit] = useState(10);

  useEffect(() => {
    dispatch(
      getStockList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        brand: selectedBrand,
        category: selectedCategory,
        lowStock: stockSelect,
      })
    );
  }, [dispatch, deleteProduct]);

  useEffect(() => {
    dispatch(getCategoryList({ limit: 1000, page: 1 }));
    dispatch(getBrandList({ limit: 1000, page: 1 }));
  }, [dispatch]);

  const columns = [
    { header: "Product Name", accessor: "name" },
    { header: "Purchase Price", accessor: "purchasePrice" },
    { header: "Sale Price", accessor: "basePrice" },
    { header: "Product code", accessor: "productCode" },

    {
      header: "Category",
      accessor: (item: any) => item?.category?.name,
    },
    {
      header: "Brand",
      accessor: (item: any) => item?.brand?.name,
    },
    { header: "Stock", accessor: "quantity" },
    { header: "Sold", accessor: "sold" },
    // {
    //   header: 'Added By',
    //   accessor: (item: any) => `${item?.user?.first_name} ${item?.user?.last_name}`,
    // }
  ];

  const handleSearch = () => {
    // e: React.KeyboardEvent<HTMLInputElement>
    // if (e.key === "Enter") {
    dispatch(
      getStockList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        brand: selectedBrand,
        category: selectedCategory,
        lowStock: stockSelect,
      })
    );
    // }
  };

  const handleBrand = (value: string) => {
    setSelectedBrand(value);
    dispatch(
      getStockList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        brand: value,
        category: selectedCategory,
        lowStock: stockSelect,
      })
    );
  };

  const handleCategory = (value: string) => {
    setSelectedCategory(value);
    dispatch(
      getStockList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        brand: selectedBrand,
        category: value,
        lowStock: stockSelect,
      })
    );
  };

  const handleStock = (value: string) => {
    setStockSelect(value);
    dispatch(
      getStockList({
        page: 1,
        limit: limit,
        searchTerm: searchValue,
        brand: selectedBrand,
        category: selectedCategory,
        lowStock: value,
      })
    );
  };

  const handlePageClick = (data: any) => {
    dispatch(
      getStockList({
        page: data.selected + 1,
        limit,
        searchTerm: searchValue,
        brand: selectedBrand,
        category: selectedCategory,
        lowStock: stockSelect,

      })
    );
    // setSelectedPage(data.selected + 1);
  };
   const handleLimitChange = (data: number) => {
        setLimit(data);
        dispatch(
          getStockList({
            page: 1,
            limit: data,
            searchTerm: searchValue,
            brand: selectedBrand,
            category: selectedCategory,
            lowStock: stockSelect,

          })
        );
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
      getProductStockList({
        user_type: "approved",
      })
    );

    const sanitizedData = pl.payload?.map((item: any) => {
      const newItem = {
        date: item.createdAt,
        name: item.name,
        category: item.category?.name,
        brand: item.brand?.name,
        productCode: item.productCode,
        purchasePrice: item.purchasePrice,
        salePrice: item.basePrice,
        taxAmount: item.taxAmount,
        discount: item.discount,
        unit: item.unit,
        stock: item.quantity,
        sold: item.sold,
        addedBy: `${item.user?.first_name} ${item.user?.last_name}`,
      };
      return newItem;
    });
    const csvData = convertToCSV(sanitizedData);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `stock list ${moment().format("hhmmssddmmyy")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="flex flex-col gap-4 px-4 pt-6 text-start text-black dark:text-white h-screen"
    >
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
                value={selectedCategory || ""}
                onChange={(e) => handleCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white 
                            border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
              >
                <option value="">Select a category</option>
                {categoryList.data.map((category: any) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mx-2">
            <div className="flex justify-center">
              <select
                value={selectedBrand || ""}
                onChange={(e) => handleBrand(e.target.value)}
                className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white 
                            border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
              >
                <option value="">Select a brand</option>
                {brandList.data.map((brand: any) => (
                  <option key={brand?.id} value={brand?.id}>
                    {brand?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mx-2">
            <div className="flex justify-center">
              <select
                value={stockSelect || ""}
                onChange={(e) => handleStock(e.target.value)}
                className="w-full px-4 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white 
                            border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none"
              >
                <option value="">In Stock</option>
                {[{ id: "low", name: "lowStock" }].map((brand: any) => (
                  <option key={brand?.id} value={brand?.id}>
                    {brand?.name}
                  </option>
                ))}
              </select>
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
        <Table columns={columns} data={stockList.data || []} isAction={false} />
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
            pageCount={stockList?.total && Math.ceil(stockList?.total / limit)}
            handlePageClick={handlePageClick}
            pageRange={2}
          />
        </div>
      </div>
    </div>
  );
};

export default StockList;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import Selector from "../Common/Select";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getSearchProducttList } from "../../store/API/productApis";
import moment from "moment";
import { PMList } from "../Purchase/PurchaseCreateUpdateForm";
import { saleType } from "../../models";
import { getCustomerList } from "../../store/API/customerApi";
import { CustomerSelector } from "../Common/CustomerSelect";

const OrderStatusList = [
  { name: "Due", id: "due" },
  { name: "Return", id: "return" },
  { name: "Completed", id: "completed" },
];

const ExpenseCreateUpdateForm = ({
  onSubmit,
  expenseDetails,
}: {
  onSubmit: (data: any) => void;
  expenseDetails?: any;
}) => {
  const { searchProducts, customerList } = useAppSelector(
    (state) => state.product
  );
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm();
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [receiveAmount, setReceiveAmount] = useState<number | string>();
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  useEffect(() => {
    dispatch(getSearchProducttList({ page: 1, limit: 20, searchTerm: "" }));
    dispatch(getCustomerList({ page: 1, limit: 20, searchTerm: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (expenseDetails) {
      (Object.keys(expenseDetails) as Array<keyof saleType>).forEach((key) => {
        let value = expenseDetails[key];

        if (key === "saleDate" && typeof value === "string") {
          value = moment(value).format("YYYY-MM-DD");
        }
        if (key === "receiveAmount") {
          setReceiveAmount(Number(value));
        }
        if (
          expenseDetails.saleProducts &&
          expenseDetails.saleProducts.length > 0
        ) {
          const initializedProducts = expenseDetails.saleProducts.map(
            (product: any) => ({
              ...product.product,
              quantity: product.quantity || 1,
              price: Number(product.price) || 0,
              discount: product.discount || 0,
              tax: product.taxAmount || 0,
              warranty: product.warranty || "",
            })
          );

          setSelectedProducts(initializedProducts);
        }
        setValue(key, value);
      });
    }
  }, [expenseDetails, setValue]);
  // Autofill customer phone and address when a customer is selected
  useEffect(() => {
    const selectedCustomerId = watch("customerName");
    // First try to find by ID
    let foundCustomer = customerList.data?.find(
      (c: any) => String(c.id) === String(selectedCustomerId)
    );

    // If not found by ID, try to find by name
    if (
      !foundCustomer &&
      typeof selectedCustomerId === "string" &&
      selectedCustomerId.trim() !== ""
    ) {
      foundCustomer = customerList.data?.find(
        (c: any) =>
          c.name && c.name.toLowerCase() === selectedCustomerId.toLowerCase()
      );
    }
    if (foundCustomer) {
      // Auto-fill other fields but keep customerName as the display name
      setValue("customerPhone", foundCustomer.phone || "");
      setValue("customerAddress", foundCustomer.address || "");
      setValue("customerId", foundCustomer.id || "");
      setIsNewCustomer(false);

      // If the value is the name but we found by name, update to id
      if (String(selectedCustomerId) !== String(foundCustomer.id)) {
        setValue("customerName", String(foundCustomer.id));
      }
    } else if (
      typeof selectedCustomerId === "string" &&
      selectedCustomerId.trim() !== ""
    ) {
      // New customer case
      setValue("customerPhone", "");
      setValue("customerAddress", "");
      setValue("customerId", "");
      setIsNewCustomer(true);
    } else {
      // Empty case
      setIsNewCustomer(true);
    }
  }, [watch("customerName"), customerList.data, setValue]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      dispatch(
        getSearchProducttList({ searchTerm: searchValue, page: 1, limit: 20 })
      );
    }
  };

  const handleAddProduct = (product: any) => {
    const exists = selectedProducts.some((p) => p.id === product.id);
    if (!exists) {
      setSelectedProducts([
        ...selectedProducts,
        {
          ...product,
          quantity: 1,
          price: product.basePrice || 0,
          discount: product.discount || 0,
          tax: product.tax || 0,
          warranty: product.warranty || "",
        },
      ]);
    }
  };

  const handleRemoveProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  const handleInputChange = (
    id: string,
    field: string,
    value: number | string
  ) => {
    setSelectedProducts(
      selectedProducts.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };
  const calculateSubtotal = (item: any) => {
    return item.quantity * item.price - item.discount + item.tax;
  };
  const grandTax = selectedProducts.reduce((sum, item) => sum + item.tax, 0);

  const grandSubtotal = useMemo(() => {
    return selectedProducts.reduce(
      (sum, item) => sum + calculateSubtotal(item),
      0
    );
  }, [selectedProducts]);

  const handleFormSubmit = (formData: any) => {
    // e.preventDefault()
    // Add selectedProducts to formData before submitting
    // console.log(formData);
    const finalData = {
      ...formData,
      products: selectedProducts,
      price: grandSubtotal,
      receiveAmount: Number(receiveAmount),
      dueAmount: grandSubtotal - Number(receiveAmount),
    };
    onSubmit(finalData);
  };
  const handleCustomerSearch = (inputValue: string) => {

    // Only proceed if there's actual input value
    if (!inputValue || inputValue.trim() === "") {
      setIsNewCustomer(true);
      return; // Don't make API call for empty input
    }

    const found = (customerList.data || []).some(
      (c: any) => c.name && c.name.toLowerCase() === inputValue.toLowerCase()
    );

    if (!found) {
      setIsNewCustomer(true);
    } else {
      setIsNewCustomer(false);
    }

    // Only make API call if we have a search term
    dispatch(getCustomerList({ page: 1, limit: 20, searchTerm: inputValue }));
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="p-6 text-black dark:text-white">
        <div className="mb-4 flex flex-col w-full">
          <div className="mb-4 flex gap-6 flex-col md:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Customer Name
              </label>
              {/*

             <input
                {...register("customerName", { required: true })}
                type="text"
                placeholder="Enter Customer name"
                className="w-full rounded border border-stroke bg-transparent py-3 px-5"
              />
              {errors?.supplier && (
                <p className="text-red-500 text-xs">This field is required.</p>
              )}
              */}
              <CustomerSelector
                register={register}
                setValue={setValue}
                watch={watch}
                name="customerName"
                list={customerList.data as any}
                onInputChange={handleCustomerSearch}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Customer Phone
              </label>
              <input
                {...register("customerPhone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01\d{9}$/,
                    message: "Phone number must be 11 digits and start with 01",
                  },
                })}
                type="text"
                placeholder="Enter Customer Phone Number"
                className="w-full rounded border border-stroke bg-transparent py-3 px-5"
                // readOnly={!isNewCustomer}
              />
              {errors?.customerPhone && (
                <p className="text-red-500 text-xs">phone number is not valid.</p>
              )}
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Customer Address
              </label>
              <input
                {...register("customerAddress", { required: true })}
                type="text"
                placeholder="Enter Customer Address"
                className="w-full rounded border border-stroke bg-transparent py-3 px-5"
                readOnly={!isNewCustomer}
              />
              {errors?.customerAddress && (
                <p className="text-red-500 text-xs">This field is required.</p>
              )}
            </div>

            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Invoice Number
              </label>
              <input
                {...register("invoiceNumber", { maxLength: 10 })}
                type="text"
                placeholder="Invoice Number"
                className="w-full rounded border border-stroke bg-transparent py-3 px-5"
              />
            </div>
          </div>
          <div className="mb-4 flex gap-6 flex-col md:flex-row">
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Payment Method
              </label>
              <Selector
                register={register}
                setValue={setValue}
                watch={watch}
                name="paymentMethod"
                list={PMList}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Order Status
              </label>
              <Selector
                register={register}
                setValue={setValue}
                watch={watch}
                name="orderStatus"
                list={OrderStatusList}
              />
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white">
                Payment Date
              </label>
              <input
                type="date"
                id="paymentDate"
                {...register("paymentDate", { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:bg-gray-800
                shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-12 px-2"
              />
              {errors.paymentDate && (
                <span className="text-sm text-red-500">
                  Payment date is required
                </span>
              )}
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-[10px] block text-black dark:text-white ">
                Sale Date
              </label>
              <input
                type="date"
                id="saleDate"
                {...register("saleDate", { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:bg-gray-800
                shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-12 px-2"
              />
              {errors.saleDate && (
                <span className="text-sm text-red-500">
                  Sale date is required
                </span>
              )}
            </div>
          </div>
          {/* Product Search */}
          <div className="relative w-full my-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search here.."
              className="border border-gray-300 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-lg w-full pl-10 p-2.5 transition-colors"
            />
          </div>

          {/* Search Results */}
          {searchProducts.data && searchProducts.data?.length > 0 && (
            <div className="bg-white dark:bg-gray-900 border rounded shadow p-3 max-h-80 overflow-y-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-900 font-bold">
                    <th className="p-2 border-b text-left">Product Name</th>
                    <th className="p-2 border-b text-left">Brand Name</th>
                    <th className="p-2 border-b text-left">Category Name</th>
                    <th className="p-2 border-b text-left">price</th>
                    <th className="p-2 border-b text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {searchProducts.data.map((product: any) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">{product.name}</td>
                      <td className="p-2 border-b">{product?.brand?.name}</td>
                      <td className="p-2 border-b">
                        {product?.category?.name}
                      </td>
                      <td className="p-2 border-b">{product.basePrice}</td>
                      <td className="p-2 border-b">
                        <button
                          type="button"
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleAddProduct(product)}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Selected Products Table */}
          {selectedProducts.length > 0 && (
            <table className="w-full mt-4 border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800">
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Quantity</th>
                  <th className="border border-gray-300 p-2">Unit Price</th>
                  <th className="border border-gray-300 p-2">Discount</th>
                  <th className="border border-gray-300 p-2">Tax</th>
                  <th className="border border-gray-300 p-2">Warranty</th>
                  <th className="border border-gray-300 p-2">SubTotal</th>
                  <th className="border border-gray-300 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id} className="bg-gray-200 dark:bg-gray-800">
                    <td className="border border-gray-300 p-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          handleInputChange(
                            product.id,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                        className="w-32 text-center bg-white dark:bg-gray-800 border border-gray-300"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        // min="0"
                        defaultValue={product.price}
                        value={product.price > 0 ? product.price : null}
                        onChange={(e) =>
                          handleInputChange(
                            product.id,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        className="w-32 text-center bg-white dark:bg-gray-800 border border-gray-300"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        // min="0"
                        defaultValue={product.discount}
                        value={product.discount > 0 ? product.discount : null}
                        onChange={(e) =>
                          handleInputChange(
                            product.id,
                            "discount",
                            Number(e.target.value)
                          )
                        }
                        className="w-32 text-center bg-white dark:bg-gray-800 border border-gray-300"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="number"
                        // min="0"
                        defaultValue={product.tax}
                        value={product.tax > 0 ? product.tax : null}
                        onChange={(e) =>
                          handleInputChange(
                            product.id,
                            "tax",
                            Number(e.target.value)
                          )
                        }
                        className="w-32 text-center bg-white dark:bg-gray-800 border border-gray-300"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="date"
                        value={
                          product.warranty
                            ? moment(product.warranty).format("YYYY-MM-DD")
                            : ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            product.id,
                            "warranty",
                            moment(e.target.value, "YYYY/MM/DD").format(
                              "YYYY/MM/DD"
                            )
                          )
                        }
                        className="w-44 p-2 text-gray-700 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      {(
                        product.quantity * product.basePrice -
                        product.discount +
                        product.tax
                      ).toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="mt-4 text-right">
            <p>Grand Tax: {grandTax.toFixed(2)}</p>
            <p>Grand Subtotal: {grandSubtotal.toFixed(2)}</p>
            <div className="my-1">
              <label htmlFor="" className="mx-2 my-1">
                Receive Amount
              </label>
              <input
                type="number"
                // min="0"
                // defaultValue={product.tax}
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(Number(e.target.value))}
                className="w-32 text-center bg-white dark:bg-gray-800 border border-gray-300"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            // onClick={handleSubmit}
            className=" px-6 rounded bg-blue-600 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseCreateUpdateForm;

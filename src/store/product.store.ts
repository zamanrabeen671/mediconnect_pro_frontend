import { createSlice } from "@reduxjs/toolkit";
import { ProductPaginationType, ProductType, PurchasePaginationType, purchaseType, saleType } from "../models";
import { getProductDetails, getProductList, getSearchProducttList, productDelete, productPurchaseList,productExpenseList, getPurchaseDetails, getExpenseDetails, getPurchaseInvoice, getExpenseInvoice, getStockList, getPurchaseDownload, getSaleDownload, getProductStockList } from "./API/productApis";
import { getCustomerList } from "./API/customerApi";


const initialState: {
  products: ProductPaginationType;
  productDetails: ProductType;
  searchProducts: ProductPaginationType;
  stockList: ProductPaginationType;
  deleteProduct: string;
  purchaseList: PurchasePaginationType;
  purchaseDetails: purchaseType;
  expenseList: PurchasePaginationType;
  expenseDetails: saleType;
  purchaseInvoice: any;
  saleInvoice: any;
  purchaseDownload: any;
  saleDownload: any;
  stockDownload: any;
  customerList: any;
  loading: boolean;
} = {
  products: {},
  productDetails: {},
  searchProducts: {},
  stockList: {},
  deleteProduct: "",
  purchaseList: {},
  expenseList: {},
  purchaseDetails: {},
  expenseDetails: {},
  purchaseInvoice: "",
  saleInvoice: "",
  purchaseDownload: [],
  saleDownload: [],
  stockDownload: [],
  customerList: {},
  loading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getProductList.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getSearchProducttList.fulfilled, (state, action) => {
      state.loading = false;
      state.searchProducts = action.payload
    })
    builder.addCase(getStockList.fulfilled, (state, action) => {
      state.loading = false;
      state.stockList = action.payload
    })
    builder.addCase(getProductStockList.fulfilled, (state, action) => {
      state.loading = false;
      state.stockDownload = action.payload
    })
    builder.addCase(productDelete.fulfilled, (state, action) => {
      state.loading = false;
      state.deleteProduct = action.payload
    })
     builder.addCase(getProductDetails.fulfilled, (state, action) => {
       state.loading = false;
       state.productDetails = action.payload;
     });
     builder.addCase(productPurchaseList.fulfilled, (state, action) => {
       state.loading = false;
       state.purchaseList = action.payload;
     });
     builder.addCase(getPurchaseDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.purchaseDetails = action.payload;
    });
    builder.addCase(getPurchaseInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.purchaseInvoice = action.payload;
    });
     builder.addCase(productExpenseList.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseList = action.payload;
    });
    builder.addCase(getExpenseDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.expenseDetails = action.payload;
    });
    builder.addCase(getExpenseInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.saleInvoice = action.payload;
    });
    builder.addCase(getPurchaseDownload.fulfilled, (state, action) => {
      state.loading = false;
      state.purchaseDownload = action.payload;
    });
    builder.addCase(getSaleDownload.fulfilled, (state, action) => {
      state.loading = false;
      state.saleDownload = action.payload;
    });
    builder.addCase(getCustomerList.fulfilled, (state, action) => {
      state.loading = false;
      state.customerList = action.payload;
    });
  },
  reducers: {},
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";

export const getProductList = createAsyncThunk(
  "user/productList",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/products`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const getSearchProducttList = createAsyncThunk(
  "user/searchProductList",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/products/searchProduct`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const productCreate = createAsyncThunk(
  "user/productCreate",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.post(`${API_URL}/products`, postData,{
        headers: {
          'Content-Type': 'multipart/form-data', // This is necessary for FormData
        }
        });
      router(`/products`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const productDelete = createAsyncThunk(
  "user/productDelete",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const response = await api.delete(`${API_URL}/products`,{
        params: paramsData,
      });
      return response?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const productEdit = createAsyncThunk(
  "user/productCreate",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.put(`${API_URL}/products`, postData);
      router(`/product/details/${postData?.id}`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "user/productCreate",
  async (id: string, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.get(`${API_URL}/products/details/${id}`);
      console.log(response);

      return response?.data?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const productPurchaseCreate = createAsyncThunk(
  "user/PurchaseCreate",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.post(`${API_URL}/purchases/bulk/`, postData);
      router(`/purchase`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const productSaleCreate = createAsyncThunk(
  "user/expenseCreate",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.post(`${API_URL}/sale/bulk/`, postData
      );
      router(`/sale`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
)

export const productPurchaseList = createAsyncThunk(
  "user/PurchaseList",
  async (paramsData: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.get(`${API_URL}/purchases/`, {
        params: paramsData,
      });
      return response?.data?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const productExpenseList = createAsyncThunk(
  "user/ExpenseList",
  async (paramsData: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.get(`${API_URL}/sale/`, {
        params: paramsData,
      });
      return response?.data?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getPurchaseDetails = createAsyncThunk(
  "user/purchaseDetails",
  async (id: string, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.get(`${API_URL}/purchases/details/${id}`);

      return response?.data?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getPurchaseInvoice = createAsyncThunk(
  "user/purchaseInvoice",
  async (id: string, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.get(`${API_URL}/purchases/invoice/${id}`);
      console.log(response);

      return response?.data?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const purchaseDelete = createAsyncThunk(
  "user/purchaseDelete",
  async (paramsData: any, { rejectWithValue, dispatch }) => {
    try {
      const api = useAxios();
      const response = await api.delete(`${API_URL}/purchases`, {
        params: paramsData,
      });
      dispatch(productPurchaseList({ page: 1, limit: 10 }));
      return response?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const purchaseEdit = createAsyncThunk(
  "user/purchaseEdit",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.put(`${API_URL}/purchases`, postData);
      router(`/purchase/details/${postData.item?.id}`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const expenseEdit = createAsyncThunk(
  "user/expenseEdit",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.put(`${API_URL}/sale`, postData);
      router(`/purchase/details/${postData.item?.id}`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const saleOrderStatusEdit = createAsyncThunk(
  "user/expenseStatusEdit",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.put(`${API_URL}/sale/status`, postData);
      router(`/sale/`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getExpenseDetails = createAsyncThunk(
  "user/saleDetails",
  async (id: string, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.get(`${API_URL}/sale/details/${id}`);
      console.log(response);

      return response?.data?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const getExpenseInvoice = createAsyncThunk(
  "user/expenseInvoice",
  async (id: string, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.get(`${API_URL}/sale/invoice/${id}`);
      // console.log(response);

      return response?.data?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const expenseDelete = createAsyncThunk(
  "user/ExpenseDelete",
  async (paramsData: any, { rejectWithValue, dispatch }) => {
    try {
      const api = useAxios();
      const response = await api.delete(`${API_URL}/sale`, {
        params: paramsData,
      });
      dispatch(productExpenseList({ page: 1, limit: 10 }));
      return response?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const getStockList = createAsyncThunk(
  "user/stockList",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/products/stock`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);


export const getProductStockList = createAsyncThunk(
  "user/stockListDownload",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/products/stock/download/`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const getPurchaseDownload = createAsyncThunk(
  "user/purchaseDownload",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/purchases/purchaseDownload`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getSaleDownload = createAsyncThunk(
  "user/saleDownload",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/sale/saleDownload`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

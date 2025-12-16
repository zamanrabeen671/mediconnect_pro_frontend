import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";

export const getCustomerList = createAsyncThunk(
  "customer/getCustomerList",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/customer`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createCustomer = createAsyncThunk(
  "customer/create",
  async (data: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.post(`${API_URL}/customer/create/`, data
      );
    
      // router(`/sale`);
      return response?.data;
    } catch (err: any) {
      console.log(err)
      return thunkAPI.rejectWithValue(err.message);
    }
  }
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";

export const paymentUpdate = createAsyncThunk(
    "user/brandCreate",
    async (data: any, thunkAPI) => {
      const { router, postData } = data;
      try {
        const api = useAxios();
        const response = await api.post(`${API_URL}/payment/`, postData);
        router(-1);
        return response?.data;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
);

export const getPaymentList = createAsyncThunk(
  "expenses/getPaymentList",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/payment/list`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
        console.log(err)
      return rejectWithValue(err.message);
    }
  }
);
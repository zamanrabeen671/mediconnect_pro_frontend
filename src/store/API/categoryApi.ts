/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";

export const getCategoryList = createAsyncThunk(
  "user/cateoryList",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/category`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

  export const categoryCreate = createAsyncThunk(
    "user/productCreate",
    async (data: any, thunkAPI) => {
      const { router, postData } = data;
      try {
        const api = useAxios();
        const response = await api.post(`${API_URL}/category/add`, postData);
        router(`/products/category`);
        return response?.data;
      } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
);
  
export const getCategory = createAsyncThunk(
  "user/cateoryDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/category/details/${id}`);
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const categoryUpdate = createAsyncThunk(
  "user/cateoryUpdate",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.put(`${API_URL}/category/`, postData);
      router(`/products/category`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const categoryDelete = createAsyncThunk(
  "user/cateoryDelete",
  async (id: number, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.delete(`${API_URL}/category/${id}`);
      thunkAPI.dispatch(getCategoryList({}));
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
  
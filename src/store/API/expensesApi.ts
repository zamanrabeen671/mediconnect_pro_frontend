/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";

export const getExpensesList = createAsyncThunk(
  "expenses/getExpensesList",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/expenses`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const getExpensesDownloadList = createAsyncThunk(
  "expenses/getExpensesDownloadList",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/expenses/list/`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const createExpenses = createAsyncThunk(
  "expenses/createExpenses",
  async (postData: any, { rejectWithValue, dispatch }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.post(`${API_URL}/expenses`, postData);
      dispatch(getExpensesList({}));
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateExpenses = createAsyncThunk(
  "expenses/updateExpenses",
  async (postData: any, { rejectWithValue, dispatch }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.put(`${API_URL}/expenses/${postData.id}`, postData);
      dispatch(getExpensesList({}));
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteExpenses = createAsyncThunk(
  "expenses/deleteExpenses",
  async (id: any, { rejectWithValue, dispatch }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.delete(`${API_URL}/expenses/${id}`);
      dispatch(getExpensesList({}));
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

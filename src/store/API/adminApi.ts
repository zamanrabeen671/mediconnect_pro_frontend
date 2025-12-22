/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";


export const getAnalyticsReport = createAsyncThunk(
  "user/admin",
  async (paramsData: Record<string, any>, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/admin/report`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const getPatientList = createAsyncThunk(
  "admin/patient-list",
  async (paramsData: Record<string, any>, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/patients`, {
        params: paramsData,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const getGeneralizedReport = createAsyncThunk(
  "user/admin-plan-report",
  async (paramsData: Record<string, any>, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/admin/generalReport`, {
        params: paramsData,
      });
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
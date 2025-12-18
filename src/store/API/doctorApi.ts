/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";

export const getDoctorList = createAsyncThunk(
  "user/doctorList",
  async (paramsData: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/doctors`, {
        params: paramsData,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const doctorCreate = createAsyncThunk(
  "user/doctorCreate",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.post(`${API_URL}/doctors`, postData);
      router(`/doctor`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getBrandDetails = createAsyncThunk(
  "user/brandDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/brand/${id}`);
      return data?.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const doctorUpdate = createAsyncThunk(
  "user/doctorUpdate",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.put(`${API_URL}/doctors/${postData.id}`, postData);
      router(`/doctors`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// export const brandDelete = createAsyncThunk(
//   "user/brandDelete",
//   async (id: number, thunkAPI) => {
//     try {
//       const api = useAxios();
//       const response = await api.delete(`${API_URL}/brand/${id}`);
//       thunkAPI.dispatch(getBrandList({}))
//       return response?.data;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

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

export const getDoctorAppointmentList = createAsyncThunk(
  "appointment/doctorAppointmentList",
  async (id: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/appointments/doctor/${id}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const getDoctorPatientList = createAsyncThunk(
  "appointment/doctorPatientList",
  async (id: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/appointments/patients/doctor/${id}`);
      return data;
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
export const doctorScheduleCreate = createAsyncThunk(
  "user/scheduleCreate",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.post(`${API_URL}/schedules`, postData);
      router(`/settings`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const doctorSchedule = createAsyncThunk(
  "user/doctorSchedule",
  async (_, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.get(`${API_URL}/schedules/me`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
export const createAppointmentWithPatient = createAsyncThunk(
  "appointment/createWithPatient",
  async (data: { postData: any; router: any }, thunkAPI) => {
    const { postData, router } = data;
    try {
      const api = useAxios();
      console.log(postData)
      const response = await api.post(`${API_URL}/appointments/appointmentByPatient`, postData);
      router(`/appointments`); // redirect to appointment list after creation
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
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

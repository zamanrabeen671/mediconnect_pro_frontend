import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";

export const getBloodGroupList = createAsyncThunk(
  "blood_group/getBloodGroupList",
  async (_, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/blood-groups`, );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createBloodGroup = createAsyncThunk(
  "blood/create",
  async (data: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.post(`${API_URL}/blood-groups`, data
      );
    
      return response?.data;
    } catch (err: any) {
      console.log(err)
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getPatientDetails = createAsyncThunk(
  "patient/getPatientDetails",
  async (patientId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/patients/${patientId}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const getPatientAppointment = createAsyncThunk(
  "patient/getPatientAppointment",
  async (patientId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/appointments/patient/${patientId}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
export const getPatientPrescriptions = createAsyncThunk(
  "patient/getPatientPrescriptions",
  async (patientId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/prescriptions/patient/${patientId}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
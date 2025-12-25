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

export const createAppointmentByPatient = createAsyncThunk(
  "patient/createAppointmentByPatient",
  async (payload: {
    patient: {
      full_name: string;
      age: number;
      gender: string;
      phone: string;
      blood_group_id: number | null;
      address: string;
    };
    doctor_id: number;
    schedule_id: number;
    appointment_date: string;
  }, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.post(`${API_URL}/appointments/appointmentByPatient`, payload);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Unable to create appointment.");
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
      return rejectWithValue(err.message || "Unable to load prescriptions.");
    }
  }
);

export const getAppointmentPrescriptions = createAsyncThunk(
  "patient/getAppointmentPrescriptions",
  async (appointmentId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/prescriptions/appointment/${appointmentId}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Unable to load appointment prescriptions.");
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
)
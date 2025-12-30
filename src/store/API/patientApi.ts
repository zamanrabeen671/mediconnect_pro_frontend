import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL, BASE_URL } from "../../settings/config";

export const getCurrentPatientProfile = createAsyncThunk(
  "patient/getCurrentPatientProfile",
  async (_, { rejectWithValue }) => {
    try {
      const api = useAxios();
      // Fetch current user info from /users/me
      const { data: userData }: any = await api.get(`${API_URL}/users/me`);
      console.log("User data from /me:", userData);
      
      // If the user response includes patient details directly, return them
      if (userData.patient) {
        console.log("Found patient in user data:", userData.patient);
        return userData.patient;
      }
      
      // If user has a patient_id, fetch the patient details
      if (userData.patient_id) {
        console.log("Fetching patient by patient_id:", userData.patient_id);
        const patientRes: any = await api.get(`${API_URL}/patients/${userData.patient_id}`);
        return patientRes.data;
      }
      
      // Otherwise, fetch all patients and find by user_id
      console.log("Fetching all patients to find by user_id:", userData.id);
      const patientsRes: any = await api.get(`${API_URL}/patients`);
      console.log("Patients response:", patientsRes.data);
      
      // Handle both array and object responses
      const patientsList = Array.isArray(patientsRes.data) ? patientsRes.data : [patientsRes.data];
      const currentPatient = patientsList.find((p: any) => p.user_id === userData.id);
      
      console.log("Found patient:", currentPatient);
      return currentPatient || null;
    } catch (err: any) {
      console.error("Error loading patient profile:", err);
      return rejectWithValue(err.message || "Unable to load patient profile.");
    }
  }
);

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

export const getPatientAppointments = createAsyncThunk(
  "patient/getPatientAppointments",
  async (patientId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/appointments/patient/${patientId}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Unable to load appointments.");
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

export const getAppointmentPrescriptions = createAsyncThunk(
  "patient/getAppointmentPrescriptions",
  async (appointmentId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${BASE_URL}/prescriptions/appointment/${appointmentId}/`);
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

export const getPatientStatistic = createAsyncThunk(
  "patient/getPatientStatistic",
  async (_, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data }: any = await api.get(`${API_URL}/patients/me/dashboard`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
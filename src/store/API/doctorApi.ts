/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";
import type { RootState } from "..";

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

export const doctorUpdateAppointmentStatus = createAsyncThunk(
  "appointment/doctorUpdateStatus",
  async (
    { id, status }: { id: number; status: string },
    thunkAPI
  ) => {
    try {
      const api = useAxios();
      const state = thunkAPI.getState() as RootState;
      const appointment = state?.doctor?.appointmentList?.find((a: any) => a.id === id);

      // Normalize time to HH:MM:SS as backend expects a time field
      const normalizeTime = (time?: string | null) => {
        if (!time) return "09:00:00"; // fallback
        const t = time.trim();
        if (/am|pm/i.test(t)) {
          const [hm, suffixRaw] = t.split(/\s+/);
          const suffix = suffixRaw?.toLowerCase();
          const [hStr, mStr = "00"] = hm.split(":");
          let h = Number(hStr);
          if (suffix === "pm" && h < 12) h += 12;
          if (suffix === "am" && h === 12) h = 0;
          return `${String(h).padStart(2, "0")}:${mStr.padStart(2, "0")}:00`;
        }
        // If already like HH:MM or HH:MM:SS
        const parts = t.split(":");
        if (parts.length >= 2) {
          const [hStr, mStr, sStr] = parts;
          return `${hStr.padStart(2, "0")}:${mStr.padStart(2, "0")}:${(sStr || "00").padStart(2, "0")}`;
        }
        return "09:00:00";
      };

      const payload = {
        status,
        doctor_id: appointment?.doctor_id,
        patient_id: appointment?.patient_id,
        schedule_id: appointment?.schedule_id ?? null,
        appointment_date: appointment?.appointment_date || new Date().toISOString().split("T")[0],
        appointment_time: normalizeTime(appointment?.appointment_time),
      };

      const response = await api.put(`${API_URL}/appointments/${id}`, payload);

      // Refresh list for current doctor so UI stays in sync
      const doctorId = state?.auth?.user?.id;
      if (doctorId) {
        thunkAPI.dispatch(getDoctorAppointmentList(doctorId));
      }

      return response?.data;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update appointment status";
      return thunkAPI.rejectWithValue(errorMessage);
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
  async (postData: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.post(`${API_URL}/schedules`, postData);
      return response?.data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to create schedule. Please ensure you are logged in.";
      console.error("Schedule creation error:", { err, errorMessage });
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
export const doctorSchedule = createAsyncThunk(
  "user/doctorSchedule",
  async (_, thunkAPI) => {
    try {
      const api = useAxios();
      // Try to get doctor ID from auth state
      const state = thunkAPI.getState() as any;
      const doctorId = state?.auth?.user?.id;
      
      if (!doctorId) {
        console.error("Doctor ID not found in auth state");
        return [];
      }
      
      console.log("Fetching doctor schedules for doctor ID:", doctorId);
      const response = await api.get(`${API_URL}/schedules/doctor/${doctorId}`);
      console.log("Doctor schedules response:", response?.data);
      return response?.data || [];
    } catch (err: any) {
      console.error("Doctor schedule fetch error:", err);
      const errorMsg = typeof err === "string" ? err : err?.message || "Failed to fetch schedules";
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);
export const doctorScheduleDelete = createAsyncThunk(
  "user/scheduleDelete",
  async (id: number, thunkAPI) => {
    try {
      const api = useAxios();
      await api.delete(`${API_URL}/schedules/${id}`);
      // Refresh schedules after delete
      const state = thunkAPI.getState() as any;
      const doctorId = state?.auth?.user?.id;
      if (doctorId) {
      thunkAPI.dispatch(doctorSchedule());
      }
      return id;
    } catch (err: any) {
      console.error("Schedule delete error:", err);
      return thunkAPI.rejectWithValue(err?.message || "Failed to delete schedule");
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

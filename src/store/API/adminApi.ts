/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";


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
export const getMedicineList = createAsyncThunk(
  "medicine/list",
  async (params: { skip?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/medicines`, {
        params,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Get medicine by ID
 */
export const getMedicineById = createAsyncThunk(
  "medicine/get-by-id",
  async (medicineId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(
        `${API_URL}/medicines/${medicineId}`
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Search medicine by name
 */
export const searchMedicineByName = createAsyncThunk(
  "medicine/search",
  async (name: string, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(
        `${API_URL}/medicines/search/${name}`
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Create medicine
 */
export const createMedicine = createAsyncThunk(
  "medicine/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.post(
        `${API_URL}/medicines`,
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Update medicine
 */
export const updateMedicine = createAsyncThunk(
  "medicine/update",
  async (
    { medicineId, payload }: { medicineId: number; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const api = useAxios();
      const { data } = await api.put(
        `${API_URL}/medicines/${medicineId}`,
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Delete medicine
 */
export const deleteMedicine = createAsyncThunk(
  "medicine/delete",
  async (medicineId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      await api.delete(`${API_URL}/medicines/${medicineId}`);
      return medicineId;
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
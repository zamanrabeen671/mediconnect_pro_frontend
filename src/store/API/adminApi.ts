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

/**
 * Admin dashboard counts
 */
export const getDashboardCounts = createAsyncThunk(
  "admin/get-dashboard-counts",
  async (_, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/admin/dashboard`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/** Pending doctors list */
export const getPendingDoctors = createAsyncThunk(
  "admin/get-pending-doctors",
  async (_, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/admin/pending-doctors`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/** Top medicines for analytics */
export const getTopMedicines = createAsyncThunk(
  "admin/get-top-medicines",
  async (limit:number = 10, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/admin/analytics/medicines`, {
        params: { limit },
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/** Top doctors by completed appointments */
export const getTopDoctors = createAsyncThunk(
  "admin/get-top-doctors",
  async (limit:number = 5, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/admin/analytics/top-doctors`, {
        params: { limit },
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/** Approve / reject doctor via existing doctors PUT endpoint */
export const updateDoctorStatus = createAsyncThunk(
  "admin/update-doctor-status",
  async ({ doctorId, status }: { doctorId: number; status: string }, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.put(`${API_URL}/doctors/${doctorId}`, { status });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/** Appointments overview for last N days */
export const getAppointmentsOverview = createAsyncThunk(
  "admin/get-appointments-overview",
  async (days:number = 7, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/admin/analytics/appointments-overview`, {
        params: { days },
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/** Popular specializations */
export const getPopularSpecializations = createAsyncThunk(
  "admin/get-popular-specializations",
  async (limit:number = 10, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/admin/analytics/specializations`, {
        params: { limit },
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Get specialization list
 */
export const getSpecializationList = createAsyncThunk(
  "specialization/list",
  async (search: string | null = null, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/specializations`, {
        params: search ? { search } : {},
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Get specialization by ID
 */
export const getSpecializationById = createAsyncThunk(
  "specialization/get-by-id",
  async (specializationId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(
        `${API_URL}/specializations/${specializationId}`
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Create specialization
 */
export const createSpecialization = createAsyncThunk(
  "specialization/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.post(
        `${API_URL}/specializations`,
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Update specialization
 */
export const updateSpecialization = createAsyncThunk(
  "specialization/update",
  async (
    { specializationId, payload }: { specializationId: number; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const api = useAxios();
      const { data } = await api.put(
        `${API_URL}/specializations/${specializationId}`,
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Delete specialization
 */
export const deleteSpecialization = createAsyncThunk(
  "specialization/delete",
  async (specializationId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      await api.delete(`${API_URL}/specializations/${specializationId}`);
      return specializationId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Get institute list
 */
export const getInstituteList = createAsyncThunk(
  "institute/list",
  async (search: string | null = null, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/institutes`, {
        params: search ? { search } : {},
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Get institute by ID
 */
export const getInstituteById = createAsyncThunk(
  "institute/get-by-id",
  async (instituteId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(
        `${API_URL}/institutes/${instituteId}`
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Create institute
 */
export const createInstitute = createAsyncThunk(
  "institute/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.post(
        `${API_URL}/institutes`,
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Update institute
 */
export const updateInstitute = createAsyncThunk(
  "institute/update",
  async (
    { instituteId, payload }: { instituteId: number; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const api = useAxios();
      const { data } = await api.put(
        `${API_URL}/institutes/${instituteId}`,
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Delete institute
 */
export const deleteInstitute = createAsyncThunk(
  "institute/delete",
  async (instituteId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      await api.delete(`${API_URL}/institutes/${instituteId}`);
      return instituteId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Get qualification list
 */
export const getQualificationList = createAsyncThunk(
  "qualification/list",
  async (search: string | null = null, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(`${API_URL}/qualifications`, {
        params: search ? { search } : {},
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Get qualification by ID
 */
export const getQualificationById = createAsyncThunk(
  "qualification/get-by-id",
  async (qualificationId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.get(
        `${API_URL}/qualifications/${qualificationId}`
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Create qualification
 */
export const createQualification = createAsyncThunk(
  "qualification/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      const api = useAxios();
      const { data } = await api.post(
        `${API_URL}/qualifications`,
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Update qualification
 */
export const updateQualification = createAsyncThunk(
  "qualification/update",
  async (
    { qualificationId, payload }: { qualificationId: number; payload: any },
    { rejectWithValue }
  ) => {
    try {
      const api = useAxios();
      const { data } = await api.put(
        `${API_URL}/qualifications/${qualificationId}`,
        payload
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Delete qualification
 */
export const deleteQualification = createAsyncThunk(
  "qualification/delete",
  async (qualificationId: number, { rejectWithValue }) => {
    try {
      const api = useAxios();
      await api.delete(`${API_URL}/qualifications/${qualificationId}`);
      return qualificationId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
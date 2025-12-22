import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getPatientList } from "../API/adminApi";

interface AdminState {
  pendingDoctors: any[];
  approvedDoctors: any[];
  patients: any[];
  stats: {
    totalDoctors: number;
    totalPatients: number;
    pendingApprovals: number;
    totalAppointments: number;
  };
  loading: boolean;
}

const initialState: AdminState = {
  pendingDoctors: [],
  approvedDoctors: [],
  patients: [],
  stats: {
    totalDoctors: 0,
    totalPatients: 0,
    pendingApprovals: 0,
    totalAppointments: 0,
  },
   loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setPendingDoctors: (state, action: PayloadAction<any[]>) => {
      state.pendingDoctors = action.payload;
      state.stats.pendingApprovals = action.payload.length;
    },
    setApprovedDoctors: (state, action: PayloadAction<any[]>) => {
      state.approvedDoctors = action.payload;
      state.stats.totalDoctors = action.payload.length;
    },
    setAdminPatients: (state, action: PayloadAction<any[]>) => {
      state.patients = action.payload;
      state.stats.totalPatients = action.payload.length;
    },
    updateStats: (
      state,
      action: PayloadAction<Partial<AdminState["stats"]>>
    ) => {
      state.stats = { ...state.stats, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatientList.fulfilled, (state, action) => {
      state.loading = false;
      state.patients = action.payload;
    });
  },
});

export const {
  setPendingDoctors,
  setApprovedDoctors,
  setAdminPatients,
  updateStats,
} = adminSlice.actions;
export default adminSlice.reducer;

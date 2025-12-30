import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  deleteMedicine,
  getMedicineById,
  getMedicineList,
  getPatientList,
  searchMedicineByName,
  updateMedicine,
  getDashboardCounts,
  getPendingDoctors,
  getTopMedicines,
  getTopDoctors,
  getAppointmentsOverview,
  getPopularSpecializations,
  updateDoctorStatus,
} from "../API/adminApi";

interface AdminState {
  pendingDoctors: any[];
  approvedDoctors: any[];
  patients: any[];
  medicines: any[];
  selectedMedicine: any | null;
  topMedicineList: any[];
  appointmentOverview: { date: string; count: number }[];
  popularSpecializations: { specialization: string; count: number }[];
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
   medicines: [],
  selectedMedicine: null,
  patients: [],
  topMedicineList: [],
  appointmentOverview: [],
  popularSpecializations: [],
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
    clearSelectedMedicine: (state) => {
      state.selectedMedicine = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPatientList.fulfilled, (state, action) => {
      state.loading = false;
      state.patients = action.payload;
    });
    builder.addCase(getDashboardCounts.fulfilled, (state, action) => {
      state.loading = false;
      const payload = action.payload || {};
      state.stats.totalDoctors = payload.total_doctors ?? state.stats.totalDoctors;
      state.stats.totalPatients = payload.total_patients ?? state.stats.totalPatients;
      state.stats.pendingApprovals = payload.pending_doctors ?? state.stats.pendingApprovals;
      state.stats.totalAppointments = payload.total_appointments ?? state.stats.totalAppointments;
    });
    builder.addCase(getPendingDoctors.fulfilled, (state, action) => {
      state.loading = false;
      state.pendingDoctors = action.payload;
      state.stats.pendingApprovals = action.payload.length;
    });
    builder.addCase(getAppointmentsOverview.fulfilled, (state, action) => {
      state.loading = false;
      state.appointmentOverview = action.payload || [];
    });
    builder.addCase(getPopularSpecializations.fulfilled, (state, action) => {
      state.loading = false;
      state.popularSpecializations = action.payload || [];
    });
    builder.addCase(getTopDoctors.fulfilled, (state, action) => {
      state.loading = false;
      // store top doctors in approvedDoctors temporarily
      state.approvedDoctors = action.payload || [];
    });
    builder.addCase(updateDoctorStatus.fulfilled, (state, action) => {
      state.loading = false;
      const updated: any = action.payload;
      // remove from pending if status changed
      state.pendingDoctors = state.pendingDoctors.filter((d) => d.id !== updated.id);
      state.stats.pendingApprovals = state.pendingDoctors.length;
    });
     builder.addCase(getMedicineList.fulfilled, (state, action) => {
      state.loading = false;
      state.medicines = action.payload;
    });
     builder.addCase(searchMedicineByName.fulfilled, (state, action) => {
      state.loading = false;
      state.medicines = action.payload;
    });
     builder.addCase(getMedicineById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedMedicine = action.payload;
    });
    
    builder.addCase(deleteMedicine.fulfilled, (state, action) => {
      state.loading = false;
      state.medicines = state.medicines.filter((medicine: any) => medicine.id !== action.payload);
    });
    builder.addCase(updateMedicine.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.medicines.findIndex((medicine: any) => medicine.id === action.payload.id);
      if (index !== -1) {
        state.medicines[index] = action.payload;
      }
    });
    builder.addCase(getTopMedicines.fulfilled, (state, action) => {
      state.loading = false;
      state.topMedicineList = action.payload;
    });
  },
});

export const {
  setPendingDoctors,
  setApprovedDoctors,
  setAdminPatients,
  updateStats,
  clearSelectedMedicine,
} = adminSlice.actions;
export default adminSlice.reducer;

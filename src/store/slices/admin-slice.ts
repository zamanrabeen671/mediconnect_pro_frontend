import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { deleteMedicine, getMedicineById, getMedicineList, getPatientList, searchMedicineByName, updateMedicine } from "../API/adminApi";

interface AdminState {
  pendingDoctors: any[];
  approvedDoctors: any[];
  patients: any[];
  medicines: any[];
  selectedMedicine: any | null;
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

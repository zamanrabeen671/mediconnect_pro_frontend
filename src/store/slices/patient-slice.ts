import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  getAppointmentPrescriptions,
  getBloodGroupList,
  getPatientAppointment,
  getPatientAppointments,
  getPatientDetails,
  getPatientPrescriptions,
  getPatientStatistic,
  searchPatients,
} from "../API/patientApi";
import { getPatientList } from "../API/adminApi";

export interface BloodGroupOut {
  id: number;
  group_name: string;
}

export interface patientDetails {
  id: number;
  full_name: string;
  age: number;
  gender: string;
  phone: string;
  address: string;

  blood_group: BloodGroupOut;
}
export interface AppointmentOut {
  id: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  status: string;
}
export interface MedicineOut {
  id: number;
  name: string;
  strength?: string;
  form?: string;
  manufacturer?: string;
}
export interface Prescriptionsmedicine {
  id: number;
  medicine: MedicineOut;
  dosage?: string;
  duration?: string;
  instruction?: string;
}
export interface PatientPrescriptions {
  medicines: [];
}

interface PatientStatistics {
  upcoming_appointments: number;
  visited_doctors: number;
  active_prescriptions: number;
}
interface PatientState {
  appointments: any[];
  doctors: any[];
  bloodGroups: any[];
  prescriptions: any[];
  patientAppointments: AppointmentOut[];
  patientPrescriptions?: PatientPrescriptions[];
  patientDetails: patientDetails | null;
  patientStatistics: PatientStatistics | null;
  patientList: any[];
  searchResults: any[];
  loading: boolean;
}

const initialState: PatientState = {
  appointments: [],
  doctors: [],
  bloodGroups: [],
  prescriptions: [],
  patientAppointments: [],
  patientPrescriptions: [],
  patientList: [],
  searchResults: [],
  patientStatistics: null,
  patientDetails: null,
  loading: false,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientAppointments: (state, action: PayloadAction<any[]>) => {
      state.appointments = action.payload;
    },
    setDoctors: (state, action: PayloadAction<any[]>) => {
      state.doctors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBloodGroupList.fulfilled, (state, action) => {
      state.loading = false;
      state.bloodGroups = action.payload;
    });
    // builder.addCase(getPatientPrescriptions.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.prescriptions = action.payload;
    // });
    builder.addCase(getAppointmentPrescriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.prescriptions = action.payload;
    });
    builder.addCase(getPatientAppointments.fulfilled, (state, action) => {
      state.loading = false;
      state.appointments = action.payload || [];
    });
    builder.addCase(getPatientStatistic.fulfilled, (state, action) => {
      state.loading = false;
      state.patientStatistics = action.payload;
    });
    builder.addCase(getPatientDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.patientDetails = action.payload;
    });
    builder.addCase(getPatientAppointment.fulfilled, (state, action) => {
      state.loading = false;
      state.patientAppointments = action.payload;
    });
    builder.addCase(getPatientPrescriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.patientPrescriptions = action.payload;
    });
    builder.addCase(getPatientList.fulfilled, (state, action) => {
      state.loading = false;
      state.patientList = action.payload;
    });
    builder.addCase(searchPatients.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload || [];
    });
  },
});

export const { setPatientAppointments, setDoctors } = patientSlice.actions;
export default patientSlice.reducer;

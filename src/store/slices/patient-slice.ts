import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getBloodGroupList, getPatientAppointment, getPatientDetails, getPatientPrescriptions } from "../API/patientApi"

export interface BloodGroupOut {
  id: number
  name: string
}

export interface patientDetails {
  id: number
  full_name: string
  age: number
  gender: string
  phone: string
  address: string

  blood_group: BloodGroupOut
}
export interface AppointmentOut {
  id: number
  patient_id: number
  doctor_id: number
  appointment_date: string
  appointment_time: string
  status: string
}
export interface MedicineOut {
  id: number
  name: string
  strength?: string
  form?: string
  manufacturer?: string
}
export interface Prescriptionsmedicine {
  id: number
  medicine: MedicineOut
  dosage?: string
  duration?: string
  instruction?: string
}
export interface PatientPrescriptions {
  medicines: []
}
interface PatientState {
  appointments: any[]
  doctors: any[]
  bloodGroups: any[],
  patientDetails: patientDetails | null
  patientAppointments: AppointmentOut[]
  patientPrescriptions?: PatientPrescriptions[]
  loading: boolean
}


const initialState: PatientState = {
  appointments: [],
  doctors: [],
  bloodGroups: [],
  patientAppointments: [],
  patientPrescriptions: [],
  patientDetails: null,
  loading: false,
}

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientAppointments: (state, action: PayloadAction<any[]>) => {
      state.appointments = action.payload
    },
    setDoctors: (state, action: PayloadAction<any[]>) => {
      state.doctors = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBloodGroupList.fulfilled, (state, action) => {
      state.loading = false;
      state.bloodGroups = action.payload;
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
  },

})

export const { setPatientAppointments, setDoctors } = patientSlice.actions
export default patientSlice.reducer

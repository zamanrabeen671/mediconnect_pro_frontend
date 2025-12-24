import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getBloodGroupList, getPatientDetails } from "../API/patientApi"

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
interface PatientState {
  appointments: any[]
  doctors: any[]
  bloodGroups: any[],
  patientDetails: patientDetails | null
  loading: boolean
}

const initialState: PatientState = {
  appointments: [],
  doctors: [],
  bloodGroups: [],
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
  },

})

export const { setPatientAppointments, setDoctors } = patientSlice.actions
export default patientSlice.reducer

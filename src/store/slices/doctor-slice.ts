import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface DoctorProfile {
  specialization: string
  institute: string
  bmdcNumber: string
  experience: string
  qualifications: string
  consultationFee: string
}

interface DoctorState {
  profile: DoctorProfile | null
  appointments: any[]
  patients: any[]
}

const initialState: DoctorState = {
  profile: null,
  appointments: [],
  patients: [],
}

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorProfile: (state, action: PayloadAction<DoctorProfile>) => {
      state.profile = action.payload
    },
    setAppointments: (state, action: PayloadAction<any[]>) => {
      state.appointments = action.payload
    },
    setPatients: (state, action: PayloadAction<any[]>) => {
      state.patients = action.payload
    },
  },
})

export const { setDoctorProfile, setAppointments, setPatients } = doctorSlice.actions
export default doctorSlice.reducer

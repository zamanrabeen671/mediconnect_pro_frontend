import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getDoctorList } from "../API/doctorApi"

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
  doctorList?: any[]
  loading: boolean
}

const initialState: DoctorState = {
  profile: null,
  appointments: [],
  patients: [],
  doctorList: [],
  loading: false,
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
  extraReducers: (builder) => {
      builder.addCase(getDoctorList.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorList = action.payload;
      });
    },
})

export const { setDoctorProfile, setAppointments, setPatients } = doctorSlice.actions
export default doctorSlice.reducer

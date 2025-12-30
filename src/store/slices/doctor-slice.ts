import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { doctorSchedule, doctorUpdateAppointmentStatus, getDoctorAppointmentList, getDoctorList, getDoctorPatientList } from "../API/doctorApi"

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
  appointmentList: any[]
  patientList: any[]
  schedule?: any[]
  loading: boolean
}

const initialState: DoctorState = {
  profile: null,
  appointments: [],
  patients: [],
  doctorList: [],
  schedule: [],
  appointmentList: [],
  patientList: [],
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
      builder.addCase(doctorSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload;
      });
      builder.addCase(getDoctorAppointmentList.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentList = action.payload;
      });
      builder.addCase(doctorUpdateAppointmentStatus.fulfilled, (state, action) => {
        const updated = action.payload as any
        if (!updated?.id) return
        state.appointmentList = state.appointmentList.map((a) => (a.id === updated.id ? { ...a, ...updated } : a))
      })
      builder.addCase(getDoctorPatientList.fulfilled, (state, action) => {
        state.loading = false;
        state.patientList = action.payload;
      });
    },
})

export const { setDoctorProfile, setAppointments, setPatients } = doctorSlice.actions
export default doctorSlice.reducer

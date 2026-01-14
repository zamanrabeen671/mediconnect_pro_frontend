import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { doctorSchedule, doctorUpdateAppointmentStatus, getDoctorAppointmentList, getDoctorAppointmentState, getDoctorList, getDoctorPatientList, getDoctorStates } from "../API/doctorApi"
import { getInstituteList, getQualificationList, getSpecializationList } from "../API/adminApi"

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
  dashboardState?: any
  appointmentState?: any[]
  specializationList: any[]
  qualificationList: any[]
  instituteList: any[]
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
  appointmentState: [],
  dashboardState: null,
  specializationList: [],
  qualificationList: [],
  instituteList: [],
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
      builder.addCase(getDoctorAppointmentState.fulfilled, (state, action) => {
        state.loading = false;
        state.appointmentState = action.payload;
      });
      builder.addCase(getDoctorStates.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardState = action.payload;
      });
       builder.addCase(getSpecializationList.fulfilled, (state, action) => {
        state.loading = false;
        state.specializationList = action.payload;
      });
       builder.addCase(getQualificationList.fulfilled, (state, action) => {
        state.loading = false;
        state.qualificationList = action.payload;
      });
       builder.addCase(getInstituteList.fulfilled, (state, action) => {
        state.loading = false;
        state.instituteList = action.payload;
      });
    },
})

export const { setDoctorProfile, setAppointments, setPatients } = doctorSlice.actions
export default doctorSlice.reducer

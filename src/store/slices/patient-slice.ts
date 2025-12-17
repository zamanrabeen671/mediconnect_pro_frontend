import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PatientState {
  appointments: any[]
  doctors: any[]
}

const initialState: PatientState = {
  appointments: [],
  doctors: [],
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
})

export const { setPatientAppointments, setDoctors } = patientSlice.actions
export default patientSlice.reducer

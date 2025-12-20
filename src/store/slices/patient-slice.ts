import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getBloodGroupList } from "../API/patientApi"

interface PatientState {
  appointments: any[]
  doctors: any[]
  bloodGroups: any[],
  loading: boolean
}

const initialState: PatientState = {
  appointments: [],
  doctors: [],
  bloodGroups: [],
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

  },

})

export const { setPatientAppointments, setDoctors } = patientSlice.actions
export default patientSlice.reducer

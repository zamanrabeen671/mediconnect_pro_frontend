import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getAppointmentPrescriptions, getBloodGroupList, getPatientPrescriptions } from "../API/patientApi"

interface PatientState {
  appointments: any[]
  doctors: any[]
  bloodGroups: any[],
  prescriptions: any[],
  loading: boolean
}

const initialState: PatientState = {
  appointments: [],
  doctors: [],
  bloodGroups: [],
  prescriptions: [],
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
    builder.addCase(getPatientPrescriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.prescriptions = action.payload;
    });
    builder.addCase(getAppointmentPrescriptions.fulfilled, (state, action) => {
      state.loading = false;
      state.prescriptions = action.payload;
    });

  },

})

export const { setPatientAppointments, setDoctors } = patientSlice.actions
export default patientSlice.reducer

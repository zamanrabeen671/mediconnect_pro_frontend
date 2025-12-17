import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth-slice"
import doctorReducer from "./slices/doctor-slice"
import patientReducer from "./slices/patient-slice"
import adminReducer from "./slices/admin-slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    patient: patientReducer,
    admin: adminReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { getUser } from "../API/userApis"

export interface User {
  id: number
  email: string
  name: string
  role: "admin" | "doctor" | "patient"
  status?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    updateProfileCompletion: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.status = action.payload
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
  },
})

export const { setUser, logout, setLoading, updateProfileCompletion } = authSlice.actions
export default authSlice.reducer

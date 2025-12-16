import { createSlice } from "@reduxjs/toolkit";
import { PermissionType, RoleType, UserPaginationType, UserType } from "../models";
import { getPermissionList, getRoleList, getUser, getUserDetails, getUserList, login } from "./API/userApis";

const initialState: {
  loading: boolean;
  user: UserType;
  userDetails: UserType;
  userList: UserPaginationType;
  permissionList: PermissionType[];
  roleList: RoleType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
} = {
  loading: false,
  user: {},
  userList: {},
  userDetails: {},
  permissionList: [],
  roleList: [],
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.loading = false;
      state.userList = action.payload;
      state.error = null;
    });
    builder.addCase(getPermissionList.fulfilled, (state, action) => {
      state.loading = false;
      state.permissionList = action.payload;
      state.error = null;
    });
    builder.addCase(getRoleList.fulfilled, (state, action) => {
      state.loading = false;
      state.roleList = action.payload;
      state.error = null;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetails = action.payload;
      state.error = null;
    });
  },
  reducers: {
    // logout: (state) => {
    //   auth.clearToken("jwtToken");
    //   state.user = {};
    // },
  },
});

export default authSlice.reducer;

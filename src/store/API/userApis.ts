/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import useAxios from "../../utils/useAxios";
import { API_URL } from "../../settings/config";
import auth from "../../utils/auth";
import axios from "axios";
import { setUser } from "../slices/auth-slice";

export const login = createAsyncThunk(
  "login",
  async (data: any, thunkAPI) => {
    const {postData, router} = data;
    const { email, password } = postData;
    try {
      const api = axios.create({ baseURL: API_URL }); // no token needed
      const response = await api.post("/auth/login", { email, password });
      auth.setToken(response.data.token);
      auth.setUserInfo(response.data.user);
      thunkAPI.dispatch(setUser(response.data.user));
      router(`/${response.data.user.role}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error?.message || "An error occurred.");
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { rejectWithValue }) => {
    const api = useAxios();
    try {
      const { data } = await api.get(`${API_URL}/users/me`);
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (paramsData: any, { rejectWithValue }) => {
    const api = useAxios();
    try {
      const { data } = await api.get(`${API_URL}/users/list`, {
        params: paramsData,
      });
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const userCreate = createAsyncThunk(
  "user/userCreate",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {


      const response = await axios.post(`${API_URL}/auth/register`, postData);
      router(`/sign-in`);
      return response?.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.get(`${API_URL}/users/details/${id}`);
      return response.data.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const userUpdate = createAsyncThunk(
  "user/userUpdate",
  async (data: any, thunkAPI) => {
    const { router, postData } = data;
    try {
      const api = useAxios();
      const response = await api.put(
        `${API_URL}/users/update`,
        postData
      );
      router(`/user/list`);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getPermissionList = createAsyncThunk(
  "user/getPermissionList",
  async (_, { rejectWithValue }) => {
    const api = useAxios();
    try {
      const { data } = await api.get(`${API_URL}/permission/list`);
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const createPermission = createAsyncThunk(
  "user/createPermission",
  async (data: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.post(`${API_URL}/permission/`, data);
      thunkAPI.dispatch(getPermissionList());
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deletePermission = createAsyncThunk(
  "user/deletePermissionList",
  async (id: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.delete(`${API_URL}/permission/${id}`);
      thunkAPI.dispatch(getPermissionList());
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getRoleList = createAsyncThunk(
  "user/getRoleList",
  async (_, { rejectWithValue }) => {
    const api = useAxios();
    try {
      const { data } = await api.get(`${API_URL}/role/list`);
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateRolePermissions = createAsyncThunk(
  "user/updateRolePermissions",
  async (data: any, thunkAPI) => {
    const { id, ...rest } = data;
    try {
      const api = useAxios();
      const response = await api.put(`${API_URL}/role/update/${id}`, rest);
      thunkAPI.dispatch(getRoleList());
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createRolePermissions = createAsyncThunk(
  "user/updateRolePermissions",
  async (data: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.post(`${API_URL}/role/create`, data);
      thunkAPI.dispatch(getRoleList());
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "user/deleteRole",
  async (id: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.delete(`${API_URL}/role/delete/${id}`);
      thunkAPI.dispatch(getRoleList());
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteRole",
  async (id: any, thunkAPI) => {
    try {
      const api = useAxios();
      const response = await api.delete(`${API_URL}/auth/delete/${id}`);
      thunkAPI.dispatch(getUserList({}));
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

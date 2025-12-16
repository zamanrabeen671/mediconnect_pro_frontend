import { createSlice } from "@reduxjs/toolkit";
import { getAnalyticsReport, getGeneralizedReport, getSummeryReport } from "./API/adminApi";
import { AdminSummer, AdminType, Reports } from "../models";


const initialState: {
    report: AdminType;
    summery: AdminSummer;
    generalizedReport: Reports;
    loading: boolean;
} = {
    report: {},
    summery: {},
    generalizedReport: {},
    loading: false,
};

const adminSlice = createSlice({
    name: "admin",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getAnalyticsReport.fulfilled, (state, action) => {
            state.loading = false;
            state.report = action.payload;
        });
        builder.addCase(getSummeryReport.fulfilled, (state, action) => {
            state.loading = false;
            state.summery = action.payload;
        });
        builder.addCase(getGeneralizedReport.fulfilled, (state, action) => {
            state.loading = false;
            state.generalizedReport = action.payload;
        });
    },
    reducers: {},
});

export const adminSliceActions = adminSlice.actions;
export default adminSlice.reducer;
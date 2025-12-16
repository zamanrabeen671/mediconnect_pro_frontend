import { createSlice } from "@reduxjs/toolkit";
import { PaymentPaginationType, PaymentType } from "../models";
import { getPaymentList, paymentUpdate } from "./API/paymentApi";



const initialState: {
  paymentUpdate: PaymentType;
  paymentList: PaymentPaginationType;
  loading: boolean;
} = {
  paymentUpdate: {},
  paymentList: {},
  loading: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(paymentUpdate.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentUpdate = action.payload;
    });
    builder.addCase(getPaymentList.fulfilled, (state, action) => {
      state.loading = false;
      state.paymentList = action.payload;
    });
    
  },
  reducers: {},
});

export const paymentActions = paymentSlice.actions;
export default paymentSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getBrandDetails, getBrandList } from "./API/brandApi";
import { BrandType, CommonPaginationType } from "../models";


const initialState: {
  brandList:CommonPaginationType;
  loading: boolean;
  brandDetails: BrandType;
} = {
  brandList: {
    data: []
  },
  loading: false,
  brandDetails: {},
};

const brandSlice = createSlice({
  name: "brand",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getBrandList.fulfilled, (state, action) => {
      state.loading = false;
      state.brandList = action.payload;
    });
    builder.addCase(getBrandDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.brandDetails = action.payload;
    });
  },
  reducers: {},
});

export const brandActions = brandSlice.actions;
export default brandSlice.reducer;
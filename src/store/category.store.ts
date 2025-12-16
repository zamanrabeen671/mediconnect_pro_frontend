import { createSlice } from "@reduxjs/toolkit";
import { getCategory, getCategoryList } from "./API/categoryApi";
import { CategoryType, CommonPaginationType } from "../models";


const initialState: {
  categoryList: CommonPaginationType;
  loading: boolean;
  categoryDetails: CategoryType;
} = {
  categoryList: {data: []},
  categoryDetails: {},
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategoryList.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryList = action.payload;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryDetails = action.payload;
    });
  },
  reducers: {},
});

export const categoryActions = categorySlice.actions;
export default categorySlice.reducer;
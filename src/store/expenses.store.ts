import { createSlice } from "@reduxjs/toolkit";
import { getExpensesDownloadList, getExpensesList } from "./API/expensesApi";
import { ExpensesPaginationType } from "../models";


const initialState: {
  expensesList: ExpensesPaginationType;
  expensesListDownload: any;
  loading: boolean;
  //   categoryDetails: CategoryType;
} = {
  expensesList: {},
  expensesListDownload: [],
  //   categoryDetails: {},
  loading: false,
};

const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getExpensesList.fulfilled, (state, action) => {
      state.loading = false;
      state.expensesList = action.payload;
    });
    builder.addCase(getExpensesDownloadList.fulfilled, (state, action) => {
      state.loading = false;
      state.expensesListDownload = action.payload;
    });
  },
  reducers: {},
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
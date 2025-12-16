import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.store";
import productReducer from "./product.store";
import brandReducer from './brand,store';
import categoryReducer from './category.store'
import adminReducer from './admin.store'
import expensesReducer from "./expenses.store";
import darkModeReducer from './mode.store';
import paymentReducer from './payment.store'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    darkMode: darkModeReducer,
    admin: adminReducer,
    expenses: expensesReducer,
    payment: paymentReducer,
  },
  // Disable Redux DevTools in production
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;
export default store;
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProductList from "./pages/Product";
import ProductCreate from "./pages/Product/create";
import CategoryList from "./pages/Category";
import CategoryCreate from "./pages/Category/create";
import BrandList from "./pages/Brand";
import BrandCreate from "./pages/Brand/create";
import ProductDetails from "./pages/Product/details";
import ProductEdit from "./pages/Product/edit";
import CategoryEdit from "./pages/Category/edit";
import BrandEdit from "./pages/Brand/edit";
import PurchaseCreate from "./pages/Purchase/create";
import { useEffect } from "react";
import { useAppSelector } from "./store/hooks";
import ExpenseCreate from "./pages/Sale/create";
import PurchaseList from "./pages/Purchase";
import ExpenseList from "./pages/Sale";
import PurchaseDetails from "./pages/Purchase/details";
import ExpenseDetails from "./pages/Sale/details";
import UserList from "./pages/User";
import CreateUser from "./pages/User/create";
import PermissionList from "./pages/Permission";
import RoleList from "./pages/Role";
import EditUser from "./pages/User/edit";
import ExpensesList from "./pages/Expenses";
import StockList from "./pages/Stock";
import ProfitAndLossReport from "./pages/Report";
import PurchaseEdit from "./pages/Purchase/edit";
import SaleEdit from "./pages/Sale/Edit";
import Payment from "./pages/Payment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { isDarkMode } = useAppSelector((state) => state.darkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/create"
            element={
              <ProtectedRoute>
                <ProductCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/details/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/edit/:id"
            element={
              <ProtectedRoute>
                <ProductEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase/edit/:id"
            element={
              <ProtectedRoute>
                <PurchaseEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sale/edit/:id"
            element={
              <ProtectedRoute>
                <SaleEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/category"
            element={
              <ProtectedRoute>
                <CategoryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/category/add"
            element={
              <ProtectedRoute>
                <CategoryCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/category/edit/:id"
            element={
              <ProtectedRoute>
                <CategoryEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/brands"
            element={
              <ProtectedRoute>
                <BrandList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/brands/edit/:id"
            element={
              <ProtectedRoute>
                <BrandEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/brands/add"
            element={
              <ProtectedRoute>
                <BrandCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/stock"
            element={
              <ProtectedRoute>
                <StockList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase"
            element={
              <ProtectedRoute>
                <PurchaseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase/create"
            element={
              <ProtectedRoute>
                <PurchaseCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/purchase/details/:id"
            element={
              <ProtectedRoute>
                <PurchaseDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sale"
            element={
              <ProtectedRoute>
                <ExpenseList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sale/create"
            element={
              <ProtectedRoute>
                <ExpenseCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sale/details/:id"
            element={
              <ProtectedRoute>
                <ExpenseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/list"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/create"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/edit/:id"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/permission"
            element={
              <ProtectedRoute>
                <PermissionList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/role/list"
            element={
              <ProtectedRoute>
                <RoleList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses/list"
            element={
              <ProtectedRoute>
                <ExpensesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report/list"
            element={
              <ProtectedRoute>
                <ProfitAndLossReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/:type/:id"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>

      <ToastContainer
        position="top-center" // 👈 This makes toasts appear at the top
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;

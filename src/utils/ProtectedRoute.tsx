import { Navigate } from "react-router";
import auth from "./auth";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

const isAuth = auth.getToken();
  return isAuth !== null ? children : <Navigate to="/login" />;
};

export default ProtectedRoute

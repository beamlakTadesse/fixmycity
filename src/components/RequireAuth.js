import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/auth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(auth);
  return allowedRoles?.includes(auth?.roles) ? (
    <Outlet />
  ) : auth?.token ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  //  : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
};

export default RequireAuth;

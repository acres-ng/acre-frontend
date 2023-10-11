import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
  return children;
};

export default ProtectedRoute;

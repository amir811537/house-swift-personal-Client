import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Loading from "../Pages/Dashboard/Loading/Loading";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <><Loading/></>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoute;

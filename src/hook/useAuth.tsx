import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";

const useAuth = () => {
  const Auth = useContext(AuthContext);
  return Auth;
};

export default useAuth;

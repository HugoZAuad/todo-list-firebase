import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Carregando...</p>;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default PrivateRoute;

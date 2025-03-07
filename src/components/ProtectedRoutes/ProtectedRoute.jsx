import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ element }) {
  const { isLoggedIn, isLoggedInLoading } = useContext(CurrentUserContext);
  const location = useLocation();

  if (!isLoggedIn && !isLoggedInLoading) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{element}</>;
}

export default ProtectedRoute;

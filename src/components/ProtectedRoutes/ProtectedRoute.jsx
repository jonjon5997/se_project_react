import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ element }) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const useLocation = useLocation();

  if (!isLoggedIn) {
    // Redirect to the main page if not logged in
    return <Navigate to="/" />;
  }

  return element; // Render the protected component if logged in
}

export default ProtectedRoute;

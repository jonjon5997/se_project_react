// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

// function ProtectedRoute({ element }) {
//   const { isLoggedIn, isLoggedInLoading } = useContext(CurrentUserContext);
//   const useLocation = useLocation();

//   if (!isLoggedIn && !isLoggedInLoading) {
//     // Redirect to the main page if not logged in
//     return <Navigate to="/" />;
//   }

//   return element; // Render the protected component if logged in
// }

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ element }) {
  const { isLoggedIn, isLoggedInLoading } = useContext(CurrentUserContext);
  const location = useLocation(); // ✅ Corrected hook

  if (!isLoggedIn && !isLoggedInLoading) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{element}</>;
}

export default ProtectedRoute;

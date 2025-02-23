// import { Navigate, useLocation } from "react-router-dom";
// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

// function ProtectedRoute({ element }) {
//   const { isLoggedIn, isLoggedInLoading } = useContext(CurrentUserContext);
//   const location = useLocation();

//   if (!isLoggedIn && !isLoggedInLoading) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return <>{element}</>;
// }

// export default ProtectedRoute;

import { Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ element }) {
  const { isLoggedIn, isLoggedInLoading } = useContext(CurrentUserContext);
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn && !isLoggedInLoading) {
      Navigate.to("/", { state: { from: location }, replace: true });
    }
  }, [isLoggedIn, isLoggedInLoading, location]);

  if (!isLoggedIn && !isLoggedInLoading) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{element}</>;
}

export default ProtectedRoute;

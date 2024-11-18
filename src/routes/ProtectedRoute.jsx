import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  allowedUserType,
  ...rest
}) => {
  let userType = "school";

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedUserType && allowedUserType !== userType) {
    return <Navigate to="/" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));

  let auth = { token: false };
  return userInfo?.isAdmin ? <Outlet /> : <Navigate to="/sign" />;
};

export default PrivateRoute;

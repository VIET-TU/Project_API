import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    // let secssion = sessionStorage.getItem("account");
    // if (!user.isAuthentication) {
    //   navigate("/login");
    //   return;
    //   // window.location.reload();
    // }
  }, []);
  if (user && user.isAuthentication) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoutes;

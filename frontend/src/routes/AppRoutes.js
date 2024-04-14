import React from "react";

import Users from "../components/ManageUser/Users";
import Login from "../components/Login/Login";
import Register from "../components/register/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/GroupRole/GroupRole";

const AppRoutes = (props) => {
  return (
    <>
      <Routes>
        {/* <Route path="/users" element={<Users />}></Route>
        <Route path="/project" element={"project"}></Route> */}
        {/* <PrivateRoutes path="/user" component={<Users />}></PrivateRoutes> */}

        {/* <Route
          path="/users"
          element={<PrivateRoutes path="/users" element={<Users />} />}
        ></Route> */}
        <Route path="/" element="home"></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route
          path="/users"
          element={<PrivateRoutes children={<Users />} />}
        ></Route>
        <Route
          path="/roles"
          element={<PrivateRoutes children={<Role />} />}
        ></Route>
        <Route
          path="/group-role"
          element={<PrivateRoutes children={<GroupRole />} />}
        ></Route>
        <Route
          path="/projects"
          element={<PrivateRoutes children={"hello wrold"} />}
        ></Route>

        <Route path="*" element="404 Not Found"></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;

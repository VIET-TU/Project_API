import React, { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userSevice";
import { useLocation } from "react-router-dom";

const UserContext = createContext();

const UserProvider = (props) => {
  const defaultData = {
    isLoading: true,
    isAuthentication: false,
    token: "",
    account: {},
  };

  const [user, setUser] = useState(defaultData);
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  const logoutContext = () => {
    setUser({ ...defaultData, isLoading: false });
  };

  const fetchUser = async () => {
    let response = await getUserAccount();
    let data = await response.data;
    console.log("data :>> ", data);
    if (data && data.EC === 0) {
      setUser({
        isLoading: false,
        isAuthentication: true,
        token: data.DT.access_token,
        account: {
          email: data.DT.email,
          username: data.DT.username,
          groupWithRoles: data.DT.groupWithRoles,
        },
      });
    } else {
      setUser({
        ...defaultData,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      window.location.pathname !== "/login"
    ) {
      fetchUser();
    } else {
      console.log("user :>> ", user);
      setUser({
        ...user,
        isLoading: false,
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loginContext, logoutContext }}
      {...props}
    ></UserContext.Provider>
  );
};

export { UserContext, UserProvider };

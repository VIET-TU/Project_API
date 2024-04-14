import logo from "./logo.svg";
import "./App.css";
import NavHeader from "./components/Navigation/NavHeader";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext, useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

import { ThreeCircles } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  console.log("user :>> ", user);
  return (
    <>
      {user.isLoading ? (
        <div className="flex min-h-[100vh] justify-center items-center">
          <ThreeCircles
            height="150"
            width="150"
            color="#1877f2"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      ) : (
        <>
          <div className="app-header">
            <NavHeader />
          </div>
          <AppRoutes></AppRoutes>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;

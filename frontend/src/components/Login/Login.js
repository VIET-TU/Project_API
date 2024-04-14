import React, { createContext, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userSevice";
import { UserContext } from "../../context/UserContext";

const Login = (props) => {
  const { loginContext } = useContext(UserContext);

  // check email or phone
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const defaultObjVaildInput = {
    isValidValueLogin: true,
    isVaildValuePasswrod: true,
  };

  const [objValidInput, setObjValidInput] = useState(defaultObjVaildInput);

  const handleLogin = async () => {
    setObjValidInput(defaultObjVaildInput);
    if (!valueLogin) {
      toast.error("Please enter your email address or phone number");
      setObjValidInput((pre) => {
        return {
          ...pre,
          isValidValueLogin: false,
        };
      });
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      setObjValidInput((pre) => {
        return {
          ...pre,
          isVaildValuePasswrod: false,
        };
      });
      return;
    }

    let response = await loginUser(valueLogin, password);
    if (response && response.data && +response.data.EC === 0) {
      //success

      let groupWithRoles = response.data.DT.groupWithRoles;
      let email = response.data.DT.email;
      let username = response.data.DT.username;
      let token = response.data.DT.access_token;

      let data = {
        isAuthentication: true,
        token,
        account: { groupWithRoles, email, username },
      };
      // sessionStorage.setItem("account", JSON.stringify(data));
      console.log("loginContext :>> ", loginContext);
      loginContext(data);
      localStorage.setItem("jwt", token);
      navigate("/users");
      // window.location.reload();
    }
    if (response && response.data && +response.data.EC !== 0) {
      //error
      toast.error(response.data.EM);
    }
  };
  const handlePressEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  // useEffect(() => {
  //   let secssion = sessionStorage.getItem("account");
  //   if (secssion) {
  //     navigate("/home");
  //     window.location.reload();
  //   }
  // }, []);

  return (
    <div>
      <div className="flex items-center login-container h-[600px] ">
        <div className="container">
          <div className="row">
            <div className=" content-left col-md-7">
              <div className="text-[40px] font-lg mb-3 text-blue-500">
                Hoi dan it
              </div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
            </div>
            <div className="flex flex-col p-10 rounded-lg shadow-lg content-right col-md-5 ">
              <div className="flex flex-col gap-[40px] p-2">
                <div className="flex flex-col gap-[10px]">
                  <input
                    type="text"
                    id="valueLogin"
                    name="valueLogin"
                    className={`${
                      objValidInput.isValidValueLogin ? "" : "is-invalid"
                    }  border p-[20px] form-control`}
                    placeholder="Email address or phone number"
                    value={valueLogin}
                    onChange={(e) => setValueLogin(e.target.value)}
                  />
                  <div className="flex flex-col gap-[10px] mt-3">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`${
                        objValidInput.isVaildValuePasswrod ? "" : "is-invalid"
                      }  border p-[20px] form-control`}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handlePressEnter}
                    />
                  </div>
                </div>
                <button className="btn btn-primary " onClick={handleLogin}>
                  Login
                </button>
              </div>
              <span className="mt-3 mb-4 text-center">
                Forgot your password ?
              </span>
              <hr />
              <button className="btn btn-success w-[50%] m-auto">
                <NavLink to="/register">Creat new account</NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

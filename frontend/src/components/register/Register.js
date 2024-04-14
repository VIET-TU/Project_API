import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { registerNewUser } from "../../services/userSevice";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const defaultInvaidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };

  const [checkInput, setCheckInput] = useState(defaultInvaidInput);

  const isValid = () => {
    setCheckInput(defaultInvaidInput);

    if (!email) {
      setCheckInput((pre) => {
        return { ...pre, isValidEmail: false };
      });
      toast.error("Email is require!");
      console.log("checkInput :>> ", checkInput);

      return false;
    }
    let regx = /^\S+@\S+\.\S+$/;
    if (!regx.test(email)) {
      setCheckInput((pre) => {
        return { ...pre, isValidEmail: false };
      });
      toast.error("Please enter a vaild email address!");
      return false;
    }
    if (!phone) {
      setCheckInput((pre) => {
        return { ...pre, isValidPhone: false };
      });
      toast.error("Phone is require!");
      return false;
    }
    if (!username) {
      setCheckInput((pre) => {
        return { ...pre, isValidUsername: false };
      });
      toast.error("Username is require!");
      return false;
    }
    if (!password) {
      setCheckInput((pre) => {
        return { ...pre, isValidPassword: false };
      });
      toast.error("Password is require!");
      return false;
    }
    if (!confirmPassword) {
      setCheckInput((pre) => {
        return { ...pre, isValidConfirmPassword: false };
      });
      toast.error("Confirm password is require!");
      return false;
    }

    if (password !== confirmPassword) {
      setCheckInput((pre) => {
        return { ...pre, isValidConfirmPassword: false };
      });
      toast.error("Your passwrod is not same!");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let check = isValid();

    if (check === true) {
      let response = await registerNewUser(email, phone, username, password);
      let serverData = response.data;
      if (serverData.EC === 0) {
        toast.success(serverData.EM);
        return navigate("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center login-container h-[600px] my-[100px]">
        <div className="container">
          <div className="row">
            <div className=" content-left col-md-7">
              <div className="text-[40px] font-bold mb-5">Hoi dan it</div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas iusto aliquid eum omnis, soluta
              </div>
            </div>
            <div className="flex flex-col p-10 rounded-lg shadow-lg content-right col-md-5 ">
              <form action="" className="flex flex-col gap-[40px] p-2">
                <div className="flex flex-col gap-[10px]">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className={`${
                      checkInput.isValidEmail ? "" : "is-invalid"
                    }  border p-[20px] form-control`}
                    placeholder="Email address "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="flex flex-col gap-[10px] mt-3">
                    <label htmlFor="phone">Phone number</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className={`${
                        checkInput.isValidPhone ? "" : "is-invalid"
                      }  border p-[20px] form-control`}
                      placeholder="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-[10px] mt-3">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={`${
                        checkInput.isValidUsername ? "" : "is-invalid"
                      }  border p-[20px] form-control`}
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-[10px] mt-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`${
                        checkInput.isValidPassword ? "" : "is-invalid"
                      }  border p-[20px] form-control`}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-[10px] mt-3">
                    <label htmlFor="re_password">Re-enter password</label>
                    <input
                      type="password"
                      id="re_password"
                      name="re_password"
                      className={`${
                        checkInput.isValidConfirmPassword ? "" : "is-invalid"
                      }  border p-[20px] form-control`}
                      placeholder="Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      o
                    />
                  </div>
                </div>
                <button className="btn btn-primary" onClick={handleRegister}>
                  Register
                </button>
              </form>
              <hr />
              <button className="btn btn-success w-[50%] m-auto">
                <NavLink to="/login">Already an account</NavLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

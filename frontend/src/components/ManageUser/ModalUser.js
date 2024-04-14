import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import {
  createUser,
  fetchGroup,
  updateCurrentUser,
} from "../../services/userSevice";

const ModalUser = (props) => {
  const [userGroups, setUserGroups] = useState([]);

  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "Male",
    groupId: "",
  };

  const vaildInputDefault = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
  };

  const [userData, setUserData] = useState(defaultUserData);
  const [validInputs, SetVaildInputs] = useState(vaildInputDefault);

  useEffect(() => {
    getGroup();
  }, []);

  useEffect(() => {
    if (props.action === "UPDATE") {
      console.log("this.props..action :>> ", props.dataModalUser);
      setUserData({
        ...props.dataModalUser,
        groupId: props.dataModalUser.Group ? props.dataModalUser.Group.id : "",
      });
    }
  }, [props.dataModalUser]);

  useEffect(() => {
    if (props.action === "CREATE") {
      if (userGroups && userGroups.length > 0) {
        setUserData({
          ...userData,
          groupId: userGroups.length > 0 ? userGroups[0].id : "",
        });
      }
    }
  }, [props.action]);

  const getGroup = async () => {
    let response = await fetchGroup();
    let data = await response.data;
    if (data && +data.EC === 0) {
      setUserGroups(data.DT);
      if (data.DT.length > 0) {
        let groups = data.DT;
        setUserData({
          ...userData,
          groupId: groups[0].id,
        });
      }
    }
  };

  const handleChangeInput = (value, name) => {
    console.log(value);
    let _userData = { ...userData };
    _userData[name] = value;
    setUserData(_userData);
  };

  const handleVaildInputs = () => {
    //
    if (props.action === "UPDATE") {
      return true;
    }

    SetVaildInputs(vaildInputDefault);
    let arr = ["email", "phone", "username", "password", "address"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let _validInputs = { ...vaildInputDefault };
        _validInputs[arr[i]] = false;
        SetVaildInputs(_validInputs);
        toast.error("Empty input  " + arr[i]);
        check = false;
        break;
      }
    }
    return check;
  };

  const handleConfirmUser = async () => {
    console.log("userData :>> ", userData);
    const check = handleVaildInputs();
    if (check) {
      let resp = null;

      if (props.action === "CREATE") {
        resp = await createUser(userData);
      } else {
        resp = await updateCurrentUser(userData);
      }
      let data = await resp.data;
      if (data && +data.EC === 0) {
        toast.success(data.EM);
        props.onHideModalUser();
        setUserData({
          ...defaultUserData,
          groupId: userGroups[0].id,
        });
      }
      if (data && +data.EC !== 0) {
        toast.error(data.EM);
        let _validInputs = { ...vaildInputDefault };
        _validInputs[data.DT] = false;
        SetVaildInputs(_validInputs);
      }
    }
  };

  const handleCloseModalUser = () => {
    props.onHideModalUser();
    setUserData(defaultUserData);
    SetVaildInputs(vaildInputDefault);
  };

  return (
    <>
      <Modal
        show={props.show}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleCloseModalUser}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>
              {props.action === "CREATE" ? "Create new user" : "Edit a user"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className="form-group col-12 col-md-6 ">
              <label htmlFor="">
                Email <span className="text-red-600">(*)</span> :
              </label>
              <input
                type="text"
                disabled={props.action === "UPDATE" ? true : false}
                className={
                  "form-control " + `${validInputs.email ? "" : "is-invalid"}`
                }
                value={userData.email}
                onChange={(e) => handleChangeInput(e.target.value, "email")}
              />
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="">
                Phone number <span className="text-red-600">(*)</span> :{" "}
              </label>
              <input
                type="text"
                disabled={props.action === "UPDATE" ? true : false}
                className={
                  "form-control " + `${validInputs.phone ? "" : "is-invalid"}`
                }
                value={userData.phone}
                onChange={(e) => handleChangeInput(e.target.value, "phone")}
              />
            </div>

            <div className="form-group col-12 col-md-6">
              <label htmlFor="">Username:</label>
              <input
                type="text"
                className={
                  "form-control " +
                  `${validInputs.username ? "" : "is-invalid"}`
                }
                value={userData.username}
                onChange={(e) => handleChangeInput(e.target.value, "username")}
              />
            </div>
            <div className="form-group col-12 col-md-6">
              {props.action === "CREATE" && (
                <>
                  <label htmlFor="">Password:</label>
                  <input
                    type="password"
                    className={
                      "form-control " +
                      `${validInputs.password ? "" : "is-invalid"}`
                    }
                    value={userData.password}
                    onChange={(e) =>
                      handleChangeInput(e.target.value, "password")
                    }
                  />
                </>
              )}
            </div>
            <div className="form-group col-12 ">
              <label htmlFor="">Address:</label>
              <input
                type="text"
                className={
                  "form-control " + `${validInputs.address ? "" : "is-invalid"}`
                }
                value={userData.address}
                onChange={(e) => handleChangeInput(e.target.value, "address")}
              />
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="">Gender:</label>
              <select
                className="form-select"
                onChange={(e) => handleChangeInput(e.target.value, "sex")}
                value={userData.sex}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="">
                Group <span className="text-red-600">(*)</span> :
              </label>

              <select
                className="form-select"
                onChange={(e) => handleChangeInput(e.target.value, "groupId")}
                value={userData.groupId}
              >
                {userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalUser}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmUser}>
            {props.action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;

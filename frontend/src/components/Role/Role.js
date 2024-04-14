import React, { useRef, useState } from "react";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { createRoles } from "../../services/roleService";
import TableRole from "./TableRole";

const Role = () => {
  const childRef = useRef();

  const dataChildDefault = {
    url: "",
    decription: "",
    isVaildUrl: true,
  };
  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault,
  });
  const handleOnChangeInput = (name, value, key) => {
    let _listChild = { ...listChilds };
    _listChild[key][name] = value;
    if (value && name === "url") {
      _listChild[key]["isVaildUrl"] = true;
    }
    setListChilds(_listChild);
  };
  const handleAddNewInput = () => {
    let _listChild = { ...listChilds };
    _listChild[`child-${uuidv4()}`] = dataChildDefault;
    setListChilds(_listChild);
  };

  const handleDeleteInput = (key) => {
    let _listChild = { ...listChilds };
    delete _listChild[key];
    setListChilds(_listChild);
  };

  const buildDataToPersit = () => {
    let result = [];
    Object.entries(listChilds).find(([key, child]) => {
      result.push({
        url: child.url,
        decription: child.decription,
      });
    });
    return result;
  };

  const handleSave = async () => {
    console.log(" :>> ", listChilds);
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url;
    });
    if (!invalidObj) {
      // call api
      let result = buildDataToPersit();
      let response = await createRoles(result);
      let data = response.data;
      console.log("data.EC :>> ", data);
      if (data && +data.EC === 0) {
        toast.success(data.EM);
        childRef.current.fetListRoleAgain();
      }
    } else {
      console.log("inValid >> ", invalidObj);
      toast.error("Input Url must not be empty...");
      let _listChild = { ...listChilds };
      const key = invalidObj[0];
      _listChild[key]["isVaildUrl"] = false;
      setListChilds(_listChild);
    }
  };
  console.log("listChilds :>> ", listChilds);

  return (
    <div>
      <div className="container">
        <div className="mt-3">
          <div>
            <h4>Add a new role</h4>
          </div>
          <div className=" role-parent">
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <div className="row role-child" key={key}>
                  <div className={`col-5 form-group ${key}`}>
                    <label htmlFor="">URL: </label>
                    <input
                      type="text"
                      className={
                        (child.isVaildUrl ? "" : "is-invalid ") + "form-control"
                      }
                      value={child.url}
                      onChange={(e) =>
                        handleOnChangeInput("url", e.target.value, key)
                      }
                    />
                  </div>
                  <div className="col-5 form-group">
                    <label htmlFor="">Decription: </label>
                    <input
                      type="text"
                      className="form-control"
                      value={child.decription}
                      onChange={(e) =>
                        handleOnChangeInput("decription", e.target.value, key)
                      }
                    />
                  </div>
                  <div className="flex items-end col-2">
                    <button
                      className="btn btn-success mr-[10px]"
                      onClick={handleAddNewInput}
                    >
                      {" "}
                      <FontAwesomeIcon className="" icon={faCirclePlus} />
                    </button>
                    {index >= 1 && (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteInput(key)}
                      >
                        {" "}
                        <FontAwesomeIcon
                          className="text-black"
                          icon={faTrash}
                        />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="mt-[20px]">
              <button onClick={handleSave} className="btn btn-warning">
                Save
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h4>List current roles</h4>
          <TableRole ref={childRef}></TableRole>
        </div>
      </div>
    </div>
  );
};

export default Role;

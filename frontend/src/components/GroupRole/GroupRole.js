import React, { useEffect, useState } from "react";
import { fetchGroup } from "../../services/userSevice";
import {
  assignRoleToGroup,
  fetchAllRole,
  fetchRoleByGroup,
} from "../../services/roleService";
import { toast } from "react-toastify";

const GroupRole = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [selectGroup, setSelectGroup] = useState();
  const [listRoles, setListRoles] = useState([]);
  const [assignRoleByGroup, SetAssignRoleByGroup] = useState([]);

  useEffect(() => {
    getGroup();
    getAllRoles();
  }, []);
  const getGroup = async () => {
    let response = await fetchGroup();
    let data = await response.data;
    if (data && +data.EC === 0) {
      setUserGroups(data.DT);
    }
  };

  const getAllRoles = async () => {
    let res = await fetchAllRole();
    let data = res.data;
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  const handleOnChangeGroup = async (id) => {
    setSelectGroup(id);
    if (id) {
      let res = await fetchRoleByGroup(id);
      let data = res.data;
      if (data && +data.EC === 0) {
        let result = buildDataRoleByGroup(data.DT, listRoles);
        SetAssignRoleByGroup(result);
      }
    }
  };
  console.log(" :>> ", assignRoleByGroup);

  const buildDataRoleByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      console.log("hello world");
      allRoles.forEach((role) => {
        let object = {};
        object.id = role.id;
        object.url = role.url;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRoles && groupRoles.length > 0) {
          object.isAssigned = groupRoles.some(
            (item) => item.url === object.url
          );
        }
        result.push(object);
      });
    }
    return result;
  };

  const handleSelectRole = (id) => {
    const _assignRoleByGroup = [...assignRoleByGroup];
    var foundIndex = _assignRoleByGroup.findIndex((x) => +x.id === +id);
    if (foundIndex > -1) {
      _assignRoleByGroup[foundIndex].isAssigned =
        !_assignRoleByGroup[foundIndex].isAssigned;
      SetAssignRoleByGroup(_assignRoleByGroup);
    }
  };
  const buildDataToSave = () => {
    // data = {groupId: 4, groupRoles: [{}, {}]}
    let result = {};
    const _assignRoleByGroup = [...assignRoleByGroup];
    result.groupId = +selectGroup;
    let groupRolesFilter = _assignRoleByGroup.filter(
      (item) => item.isAssigned === true
    );
    let finalGroupRoles = groupRolesFilter.map((item) => {
      let data = { groupId: +selectGroup, roleId: +item.id };
      return data;
    });
    result.groupRoles = finalGroupRoles;
    return result;
  };
  const handleSave = async () => {
    let result = buildDataToSave();
    let res = await assignRoleToGroup(result);
    let data = res.data;
    if (data && +data.EC === 0) {
      toast.success(data.EM);
    }else{
        toast.error(data.EM)
    }
  };
  return (
    <div>
      <div className="container mt-3">
        <h4>Group Role: </h4>

        <div className="asign-group-role">
          <div className="form-group col-12 col-md-6">
            <label htmlFor="">
              Select Group <span className="text-red-600">(*)</span> :
            </label>

            <select
              className="form-select"
              onChange={(e) => handleOnChangeGroup(e.target.value)}
            >
              <option value={""}>Select your group</option>
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
        <hr />
        {selectGroup && (
          <div className="roles">
            <h4>Assign Roles: </h4>
            {assignRoleByGroup &&
              assignRoleByGroup.length > 0 &&
              assignRoleByGroup.map((item, index) => (
                <div className="form-check" key={"list-role-" + index}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={item.id}
                    id={item.url}
                    checked={item.isAssigned}
                    onChange={(e) => handleSelectRole(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor={item.url}>
                    {item.url}
                  </label>
                </div>
              ))}
          </div>
        )}
        <div className="mt-3">
          <button className="btn btn-warning" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupRole;

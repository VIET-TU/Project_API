import axios from "../setup/axios";

const createRoles = async (roles) => {
  return await axios.post("/api/v1/role/create", [...roles]);
};

const fetchAllRole = async (page, limit) => {
  return await axios.get(`/api/v1/role/read`);
};

const deleteRole = async (id) => {
  return await axios.delete("/api/v1/role/delete", {
    data: {
      id,
    },
  });
};

const fetchRoleByGroup = async (groupId) => {
  return await axios.get(`/api/v1/role/by-group/${groupId}`);
};

const assignRoleToGroup = async (data) => {
  return await axios.post(`/api/v1/role/assign-to-group`, data);
};

export {
  createRoles,
  fetchAllRole,
  deleteRole,
  fetchRoleByGroup,
  assignRoleToGroup,
};

import axios from "../setup/axios";

const registerNewUser = async (email, phone, username, password) => {
  return await axios.post("/api/v1/register", {
    email,
    phone,
    username,
    password,
  });
};

const loginUser = async (valueLogin, password) => {
  return await axios.post("/api/v1/login", {
    valueLogin,
    password,
  });
};

const fetchAllUser = async (page, limit) => {
  return await axios.get(`/api/v1/users/read?page=${page}&limit=${limit}`);
};

const deleteUser = async (id) => {
  return await axios.delete("/api/v1/users/delete", {
    data: {
      id,
    },
  });
};

const createUser = async (data) => {
  return await axios.post("/api/v1/users/create", {
    ...data,
  });
};

const fetchGroup = async (id) => {
  return await axios.get("/api/v1/group/read");
};

const updateCurrentUser = async (user) => {
  return await axios.put("/api/v1/users/update", {
    ...user,
  });
};

const getUserAccount = async () => {
  return await axios.get("/api/v1/account");
};

const logoutUser = async () => {
  return await axios.post("/api/v1/logout");
};

export {
  registerNewUser,
  loginUser,
  fetchAllUser,
  deleteUser,
  fetchGroup,
  createUser,
  updateCurrentUser,
  getUserAccount,
  logoutUser,
};

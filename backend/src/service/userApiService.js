const db = require("../models");
import bcrypt from "bcrypt";
import loginRegisterService from "./loginRegisterService";

const getAllUser = async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      //   raw: true,
      //   nest: true,
    });
    if (users) {
      return {
        EM: "Get data success",
        EC: "0",
        DT: users,
      };
    } else {
      return {
        EM: "Get data success",
        EC: "0",
        DT: [],
      };
    }
  } catch (error) {
    console.log("error :>> ", error);
    return {
      EM: "Something wrongs in service ...",
      EC: "-2",
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.User.findAndCountAll({
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      offset: offset,
      limit: limit,
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "Get data success",
      EC: "0",
      DT: data,
    };
  } catch (error) {
    console.log("error :>> ", error);
    return {
      EM: "Something wrongs in service ...",
      EC: "-2",
      DT: [],
    };
  }
};

const createNewUser = async (userData) => {
  // check email/phonenumber are exits
  let isEmailExit = await loginRegisterService.checkEmailExist(userData.email);
  if (isEmailExit === true) {
    return {
      EM: "The email is already existed",
      EC: 1,
      DT: "email",
    };
  }
  let isPhoneExist = await loginRegisterService.checkPhoneExist(userData.phone);
  if (isPhoneExist === true) {
    return {
      EM: "The phone is already existed",
      EC: 1,
      DT: "phone",
    };
  }

  const { password } = userData;
  let hashPassword = await loginRegisterService.hashUserPassword(password);
  try {
    const data = await db.User.create({
      ...userData,
      password: hashPassword,
    });
    return {
      EM: "create new a user success",
      EC: "0",
      DT: data,
    };
  } catch (error) {
    console.log("error :>> ", error);
    return {
      EM: "Something wrongs in service ...",
      EC: "-2",
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: "Error  with empty groupId",
        EC: "1",
        DT: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "Update user success",
        EC: "0",
        DT: [],
      };
    } else {
      return {
        EM: "User not found",
        EC: "0",
        DT: "",
      };
    }
  } catch (error) {
    console.log("error :>> ", error);
    return {
      EM: "Something wrongs in service ...",
      EC: "-2",
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({
      where: { id: id },
    });
    return {
      EM: "Delete data success",
      EC: "0",
      DT: [],
    };
  } catch (error) {
    console.log("error :>> ", error);
    return {
      EM: "Something wrongs in service ...",
      EC: "-2",
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};

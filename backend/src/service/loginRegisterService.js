const db = require("../models");
import bcrypt from "bcrypt";
import { createJWT } from "../middleware/JWTAction";
const { Op } = require("sequelize");
import { getGroupWithRoles } from "./JWTService";

const hashUserPassword = async (userPassword) => {
  const salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    // check email/phonenumber are exits
    let isEmailExit = await checkEmailExist(rawUserData.email);
    if (isEmailExit === true) {
      return {
        EM: "The email is already existed",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already existed",
        EC: 1,
      };
    }

    // hash user password
    let hashPassword = await hashUserPassword(rawUserData.password);

    console.log("rawUserData :>> ", rawUserData);
    // create new user
    await db.User.create({
      ...rawUserData,
      password: hashPassword,
      groupId: 4,
    });
    return {
      EM: "A user is created successfully",
      EC: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service ...",
      EC: "-2",
    };
  }
};

const checkPassowrd = async (inputPassword, hashPasswrod) => {
  return await bcrypt.compare(inputPassword, hashPasswrod);
};

const handleLoginUser = async (rawData) => {
  console.log("rawData :>> ", rawData);
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
      raw: true,
    });
    console.log("user :>> ", user);
    if (user) {
      let isCorrectPassword = await checkPassowrd(
        rawData.password,
        user.password
      );
      if (isCorrectPassword === true) {
        // test role
        let groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          username: user.username,
          groupWithRoles,
        };
        let token = createJWT(payload);
        return {
          EM: "OK!",
          EC: 0,
          DT: {
            access_token: token,
            email: user.email,
            username: user.username,
            groupWithRoles,
          },
        };
      }
    }
    console.log(">>> Not found email/password", rawData.valueLogin);
    return {
      EM: "Your email/phone or password is incorrect!",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log("error :>> ", error);
    return {
      EM: "Something wrongs in service ...",
      EC: "-2",
    };
  }
};

module.exports = {
  registerNewUser,
  handleLoginUser,
  checkEmailExist,
  checkPhoneExist,
  hashUserPassword,
};

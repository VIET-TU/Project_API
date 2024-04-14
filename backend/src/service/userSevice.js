import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import db from "../models/index";

const hashUserPassword = async (userPassword) => {
  const salt = await bcrypt.genSalt(10);
  let hashPassword = await bcrypt.hash(userPassword, salt);
  return hashPassword;
};

const createNewUser = async ({ email, password, username }) => {
  let hashPassword = await hashUserPassword(password);
  try {
    await db.User.create({
      username: username,
      password: hashPassword,
      email: email,
    });
  } catch (error) {
    console.log(error);
  }
};

const getListUsers = async () => {
  try {
    // test relationship
    let newUser = await db.User.findOne({
      where: { id: 1 },
      attributes: ["id", "username", "email"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      raw: true, // data tra ve la 1 object js
      nest: true, //  group => 1 object
    });

    //
    let roles = await db.Role.findAll({
      include: { model: db.Group, where: { id: 1 } },
      raw: true,
      nest: true,
    });

    console.log("newUser :>> ", newUser);
    console.log("roles :>> ", roles);

    const users = await db.User.findAll({
      raw: true,
    }); // tra 1 object {} --  findAll() or find() => 1 array object [{}, ...]
    return users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getByUserId = async (id) => {
  try {
    const user = await db.User.findOne({ where: { id: id } }); // tra 1 object {} --  findAll() or find() => 1 array object [{}, ...]
    return user;
  } catch (error) {
    console.log(error);
  }
};

const postUpdateUser = async (user) => {
  const result = await db.User.update(
    {
      email: user.email,
      username: user.username,
    },
    { where: { id: user.id } }
  );
};

// servie liên quan đến logic database

export { createNewUser, getListUsers, deleteUser, getByUserId, postUpdateUser };

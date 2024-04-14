const db = require("../models");

const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "decription"],
      raw: true,
    });
    const persit = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );
    console.log("persit :>> ", persit);

    if (persit.length === 0) {
      return {
        EM: "nothing to create ...",
        EC: "0",
        DT: [],
      };
    }
    await db.Role.bulkCreate(persit);

    return {
      EM: `Create roles success: ${persit.length} roles ...`,
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

const getAllRoles = async (roles) => {
  try {
    let data = await db.Role.findAll({
      attributes: ["id", "url", "decription"],
      order: [["id", "DESC"]],
      raw: true,
    });

    return {
      EM: `Get all roles success`,
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

const deleteUser = async (id) => {
  try {
    let data = await db.Role.destroy({
      where: { id: id },
    });
    return {
      EM: `Delete roles success`,
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

const getRoleByGroup = async (id) => {
  try {
    if (!id) {
      return {
        EM: "Not found any roles",
        EC: "0",
        DT: [],
      };
    }
    let data = await db.Role.findAll({
      attributes: ["id", "url", "decription"],
      include: {
        model: db.Group,
        where: { id: id },
        attributes: [],
      },
      throw: { attributes: [] },
    });

    return {
      EM: `Get Roles by group success`,
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

const assignRoleToGroup = async (roles) => {
  try {
    await db.Group_Role.destroy({
      where: { groupId: +roles.groupId },
    });
    await db.Group_Role.bulkCreate(roles.groupRoles);
    return {
      EM: `Assign Role to Group success`,
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
  createNewRoles,
  getAllRoles,
  deleteUser,
  getRoleByGroup,
  assignRoleToGroup,
};

const db = require("../models");

const getAllGroup = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });
    return {
      EM: "Get groups success",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Something wrongs in service ...",
      EC: "-2",
    };
  }
};

module.exports = {
  getAllGroup,
};

const { getAllGroup } = require("../service/groupService");

const readFunc = async (req, res) => {
  try {
    let data = await getAllGroup();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("erro :>> ", error);
    return res.status(500).json({
      EM: "error from server", // error message
      EC: "-1", // error code
      DT: error, //date
    });
  }
};

module.exports = {
  readFunc,
};

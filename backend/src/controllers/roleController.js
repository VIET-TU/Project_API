import roleApiService from "../service/roleApiService";
import userApiService from "../service/userApiService";

const roleController = {
  readFunc: async (req, res) => {
    try {
      let data = await roleApiService.getAllRoles();

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      return res.status(500).json({
        EM: "error from server", // error message
        EC: "-1", // error code
        DT: error, //date
      });
    }
  },
  createFunc: async (req, res) => {
    try {
      let data = await roleApiService.createNewRoles(req.body);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        EM: "error from server", // error message
        EC: "-1", // error code
        DT: error, //date
      });
    }
  },
  // todo
  updateFunc: async (req, res) => {
    try {
      let data = await userApiService.updateUser(req.body);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      return res.status(500).json({
        EM: "error from server", // error message
        EC: "-1", // error code
        DT: error, //date
      });
    }
  },
  deleteFunc: async (req, res) => {
    try {
      let data = await roleApiService.deleteUser(req.body.id);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      return res.status(500).json({
        EM: "error from server", // error message
        EC: "-1", // error code
        DT: error, //date
      });
    }
  },

  getRoleByGroup: async (req, res) => {
    try {
      const id = req.params.groupId;
      let data = await roleApiService.getRoleByGroup(id);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      return res.status(500).json({
        EM: "error from server", // error message
        EC: "-1", // error code
        DT: error, //date
      });
    }
  },
  assignRoleToGroup: async (req, res) => {
    try {
      let data = await roleApiService.assignRoleToGroup(req.body);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      return res.status(500).json({
        EM: "error from server", // error message
        EC: "-1", // error code
        DT: error, //date
      });
    }
  },
};

export default roleController;

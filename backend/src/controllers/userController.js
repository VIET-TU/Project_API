import userApiService from "../service/userApiService";

const userController = {
  readFunc: async (req, res) => {
    try {
      if (req.query.page && req.query.limit) {
        let page = req.query.page;
        let limit = req.query.limit;
        let data = await userApiService.getUserWithPagination(+page, +limit);
        return res.status(200).json({
          EM: data.EM,
          EC: data.EC,
          DT: data.DT,
        });
      } else {
        let data = await userApiService.getAllUser();
        return res.status(200).json({
          EM: data.EM,
          EC: data.EC,
          DT: data.DT,
        });
      }
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
      let data = await userApiService.createNewUser(req.body);
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
      let data = await userApiService.deleteUser(req.body.id);
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
  getUserAccount: async (req, res) => {
    console.log("req.user :>> ", req.user);
    try {
      return res.status(200).json({
        EM: "ok",
        EC: 0,
        DT: {
          access_token: req.token,
          email: req.user.email,
          username: req.user.username,
          groupWithRoles: req.user.groupWithRoles,
        },
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

export default userController;

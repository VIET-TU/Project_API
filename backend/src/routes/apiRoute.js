import express from "express";
import {
  handleRegister,
  handleLogin,
  handleLogout,
} from "../controllers/apiController";
import userController from "../controllers/userController";
import roleController from "../controllers/roleController";
import groupController from "../controllers/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";

const router = express.Router();

// const checkUser = () => {
//   const nonSecurePaths = ["/", "/register", "/login"];
//   if (nonSecurePaths.includes(req.path)) return next();

//   //authenticate user
//   next();
// };

const initApiRoutes = (app) => {
  // all middleware xut li http (GET, POST, PUT, DELETE, PATCH, v.v.)
  // "*" chap nhan tat ca url

  router.all("*", checkUserJWT, checkUserPermission);

  router.post("/register", handleRegister);
  router.post("/login", handleLogin);

  router.post("/logout", handleLogout);

  //user route
  router.get("/account", userController.getUserAccount);

  router.get("/users/read", userController.readFunc);
  router.post("/users/create", userController.createFunc);
  router.put("/users/update", userController.updateFunc);

  // roles route
  router.get("/role/read", roleController.readFunc);
  router.post("/role/create", roleController.createFunc);
  router.put("/role/update", roleController.updateFunc);
  router.delete("/role/delete", roleController.deleteFunc);
  router.get("/role/by-group/:groupId", roleController.getRoleByGroup);
  router.post("/role/assign-to-group", roleController.assignRoleToGroup);

  //group route
  router.get("/group/read", groupController.readFunc);

  return app.use("/api/v1", router);
};

export default initApiRoutes;

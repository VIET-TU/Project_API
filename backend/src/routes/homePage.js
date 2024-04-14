import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.post("/edit-user/:id", homeController.handleEditUser);
  router.post("/users/update-user", homeController.handleUpdateUser);

  return app.use("/", router);
};

export default initWebRoutes;

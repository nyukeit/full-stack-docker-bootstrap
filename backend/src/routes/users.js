// USER : /api/users
// ----------------------------------------------------

const express = require("express");
const users = express.Router();

let userController;
if (process.env.DATATYPE === "mongodb")
  userController = require("../controllers/UserControllerMongo"); // instantiate
else userController = require("../controllers/UserController"); // instantiate

// const {
//   auth,
//   isAdmin,
//   isRightUser,
//   isRightUserOrAdmin,
// } = require("../middlewares/authJWT");

users.get("/", userController.findAll);
users.get("/:uuid", userController.findByUuid);
users.post("/", userController.create);
users.put("/:uuid", userController.update);
users.delete("/:uuid", userController.deleteByUuid);

module.exports = users;

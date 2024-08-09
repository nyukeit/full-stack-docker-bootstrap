// MongoDB
const UserDAO = require("../models/daoMongo/UserDAO");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

class UserController {
  async findAll(req, res, next) {
    console.log("UserController# findAll");
    try {
      const users = await UserDAO.findAll();
      users.forEach((user) => delete user.password);
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async findByUuid(req, res, next) {
    console.log("UserController# findOne", req.params);
    try {
      const user = await UserDAO.findByUuid(req.params.uuid);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      delete user.password;
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    console.log("UserController# create", req.body);
    const userData = req.body;
    userData.uuid = uuidv4();
    userData.password = bcrypt.hashSync(userData.password, 10);

    try {
      await UserDAO.create(userData);
      delete userData.password;
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    console.log("UserController# update", req.body);
    const userData = req.body;
    userData.uuid = req.params.uuid;
    try {
      const user = await UserDAO.findByUuid(userData.uuid);
      if (userData.password) {
        userData.password = bcrypt.hashSync(userData.password, 10);
      }
      const updatedUser = await UserDAO.update(userData);
      return res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteByUuid(req, res, next) {
    console.log("UserController# deleteByUuid");
    try {
      await UserDAO.deleteByUuid(req.params.uuid);
      return res.json({ message: "User deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
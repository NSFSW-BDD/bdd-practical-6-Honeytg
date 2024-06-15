const userModel = require("../models/userModel.js");

const userController = {
  readAllUser: (req, res, next) => {
    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readAllUser:", error);
        res.status(500).json(error);
      } else res.status(200).json(results);
    };
    userModel.selectAllUsers(callback);
  },

  readUserById: (req, res, next) => {
    const data = {
      userid: req.params.userid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error readUserById:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else res.status(200).json(results[0]);
      }
    };

    userModel.selectUserById(data, callback);
  },

  createNewUser: (req, res, next) => {
    const data = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error createNewUser:", error);
        res.status(500).json(error);
      } else {
        res.status(201).json(results);
      }
    };

    userModel.insertNewUser(data, callback);
  },

  updateUserById: (req, res, next) => {
    const data = {
      id: req.params.id,
      username: req.body.username,
      email: req.body.email,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error updateUserById:", error);
        res.status(500).json(error);
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else res.status(204).send(); // 204 No Content
      }
    };

    userModel.updateUserById(data, callback);
  },

  deleteUserById: (req, res, next) => {
    const data = {
      userid: req.params.userid,
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error deleteUserById:", error);
        res.status(500).json(error);
      } else {
        if (results.affectedRows == 0) {
          res.status(404).json({
            message: "User not found",
          });
        } else res.status(204).send(); // 204 No Content
      }
    };

    userModel.deleteUserById(data, callback);
  },

  loginUser: (req, res, next) => {

    const data = {
      email: req.body.email,
      password: req.body.password
    };

    const callback = (error, results, fields) => {
      if (error) {
        console.error("Error Login:", error);
        res.status(500).json(error);
      } else {
        if (results.length == 0) {//no match 
          res.status(404).json({
            message: "email/password wrong",
          });
        } else { //match email and password
          res.locals.userid = results[0].userid;//saves userid from database in res.locals for use in jwt payload
          res.locals.role = results[0].role;  //saves role from database in res.locals for use in jwt payload
          next(); //call next middleware to issue token
        }
      }
    };
    userModel.loginUser(data, callback);
  }
};

module.exports = userController;

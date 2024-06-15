const express = require("express");
const controller = require("../controllers/userController");
const jwtMiddleware=require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const router = express.Router();

//create your routes eg router.get('/', controller.readAllUser);
router.post("/login", controller.loginUser,bcryptMiddleware.hashPassword,bcryptMiddleware.comparePassword,jwtMiddleware.generateToken,jwtMiddleware.sendToken);
router.get("/",jwtMiddleware.verifyToken,jwtMiddleware.verifyAdmin, controller.readAllUser);
router.post("/register", controller.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, controller.createNewUser, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
//router.get('/', controller.readAllUser); // calls the readAllUser function from the userController.
//router.post('/', controller.createNewUser); //calls the createNewUser function from the userController.

router.get('/:userid', controller.readUserById);//calls the readUserById function from the userController, where :userid is a route parameter representing the user's ID.
router.put('/:userid', controller.updateUserById);//calls the updateUserById function from the userController, where :userid is a route parameter representing the user's ID.
router.delete('/:userid', controller.deleteUserById);//calls the deleteUserById function from the userController, where :userid is a route parameter representing the user's ID.
module.exports = router;
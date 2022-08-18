const userRoute = require("express").Router();
const { UserController } = require("../../controllers");

userRoute.get("/", UserController.getUsers);
userRoute.post("/", UserController.create);
userRoute.get("/update/:id", UserController.updatePage);
userRoute.post("/update/:id", UserController.update);
userRoute.get("/:id", UserController.delete);

module.exports = userRoute;

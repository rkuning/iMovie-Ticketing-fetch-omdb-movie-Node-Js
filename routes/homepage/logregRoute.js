const logregRoute = require("express").Router();
const { LogregController } = require("../../controllers");

logregRoute.get("/register", LogregController.registerPage);
logregRoute.post("/register", LogregController.register);
logregRoute.get("/login", LogregController.loginPage);
logregRoute.post("/login", LogregController.login);

module.exports = logregRoute;

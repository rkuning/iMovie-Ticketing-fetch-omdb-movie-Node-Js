const route = require("express").Router();
const logregRoutes = require("./homepage/logregRoute");
const apiRoutes = require("./admin");
const userRoutes = require("./user");
const redeemRoutes = require("./user/redeemRoute");
const { HomeController } = require("../controllers");

route.get("/", HomeController.getMovies); //udh

route.use("/", logregRoutes); //udh

route.use("/users", redeemRoutes); //udh

route.use("/api", apiRoutes);

route.use("/users", userRoutes); //udh

module.exports = route;

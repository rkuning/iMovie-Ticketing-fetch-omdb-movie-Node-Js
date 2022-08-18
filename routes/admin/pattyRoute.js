const pattyRoute = require("express").Router();
const { PattyController } = require("../../controllers");

pattyRoute.get("/", PattyController.getPatties);
pattyRoute.post("/:id", PattyController.update);

module.exports = pattyRoute;

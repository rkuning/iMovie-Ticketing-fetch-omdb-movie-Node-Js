const scheduleRoute = require("express").Router();
const { ScheduleController } = require("../../controllers");

scheduleRoute.get("/", ScheduleController.getSchedules);
scheduleRoute.post("/", ScheduleController.create);
scheduleRoute.get("/:id", ScheduleController.delete);

module.exports = scheduleRoute;

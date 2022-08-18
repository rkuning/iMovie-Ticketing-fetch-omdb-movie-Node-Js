const seatRoute = require("express").Router();
const { SeatController } = require("../../controllers");

seatRoute.get("/", SeatController.getSeats);
seatRoute.post("/", SeatController.create);
seatRoute.get("/:id", SeatController.delete);

module.exports = seatRoute;

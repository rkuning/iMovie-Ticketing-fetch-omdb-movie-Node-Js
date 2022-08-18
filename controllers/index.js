const LogregController = require("./homepage/LogregController");
const UserController = require("./admin/UserController.js");
const PattyController = require("./admin/PattyController");
const SeatController = require("./admin/SeatController");
const ScheduleController = require("./admin/ScheduleController");
const StudioController = require("./admin/StudioController");
const MovieController = require("./admin/MovieController");
const VoucherController = require("./admin/VoucherController");
const HomeController = require("./homepage/HomeController");
const RedeemController = require("./user/RedeemController");
const IndexController = require("./user/IndexController");
const TicketController = require("./user/TicketController");
const ProfilController = require("./user/ProfilController");

module.exports = {
  UserController,
  LogregController,
  PattyController,
  SeatController,
  ScheduleController,
  StudioController,
  MovieController,
  VoucherController,
  HomeController,
  RedeemController,
  IndexController,
  TicketController,
  ProfilController,
};

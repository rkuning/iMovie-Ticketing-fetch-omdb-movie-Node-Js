const redeemRoute = require("express").Router();
const { RedeemController } = require("../../controllers");

redeemRoute.post("/redeem", RedeemController.redeem);

module.exports = redeemRoute;

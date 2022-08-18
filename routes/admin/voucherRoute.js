const voucherRoute = require("express").Router();
const { VoucherController } = require("../../controllers");

voucherRoute.get("/", VoucherController.getVouchers);
voucherRoute.post("/", VoucherController.create);
voucherRoute.get("/:id", VoucherController.delete);

module.exports = voucherRoute;

const { voucher } = require("../../models");

class VoucherController {
  static async getVouchers(req, res) {
    try {
      let vouchers = await voucher.findAll();
      res.status(200).render("./admin/pages/voucher/indexVouchers", {
        layout: "./admin/partials/main-layout",
        title: `iMovieXXI Administrator - Vouchers`,
        msg: ``,
        vouchers,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { balance } = req.body;
      let code = (Math.random() + 1).toString(36).substring(6);
      let resCreate = await voucher.create({ code, balance });
      let vouchers = await voucher.findAll();
      res.status(201).render("./admin/pages/voucher/indexVouchers", {
        layout: "./admin/partials/main-layout",
        title: `iMovieXXI Administrator - Vouchers`,
        msg: `Create Succesfully!`,
        vouchers,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await voucher.destroy({ where: { id } });
      let vouchers = await voucher.findAll();
      if (result === 1) {
        res.status(200).render("./admin/pages/voucher/indexVouchers", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Vouchers`,
          msg: `Delete succesfully!`,
          vouchers,
        });
      } else {
        res.status(404).json({ msg: `not found` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = VoucherController;

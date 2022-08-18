const { patty, voucher } = require("../../models");

class RedeemController {
  static async redeem(req, res) {
    try {
      const { id } = req.cookies.user;
      const userId = id;
      const { code } = req.body;
      let msg = "";
      let vouchers = await voucher.findAll();
      for (let v in vouchers) {
        if (vouchers[v].code === code && vouchers[v].is_valid === true) {
          let { balance } = await patty.findOne({ where: { userId } });
          let datVoucher = await voucher.findOne({ where: { code } });
          let voucBalance = +datVoucher.balance + +balance;
          await voucher.update({ is_valid: false }, { where: { code } });
          await patty.update({ balance: voucBalance }, { where: { userId } });
          msg = "Redeem successfully";
          break;
        } else {
          msg = `Voucher isnt valid!`;
        }
      }
      res.redirect("/users");
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = RedeemController;

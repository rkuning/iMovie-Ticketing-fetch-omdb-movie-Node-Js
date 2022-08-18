const { user, patty } = require("../../models");
const { decryptPw } = require("../../helpers/bcrypt");

class ProfilController {
  static async getProfil(req, res) {
    try {
      const user = req.cookies.user;
      let { balance } = await patty.findOne({ where: { userId: user.id } });
      balance = balance.toLocaleString();
      res.status(200).render("./user/profil/profilIndex", {
        layout: "./user/partials/main-layout",
        title: `iMovieXXI - Profil`,
        msg: ``,
        user,
        balance,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ProfilController;

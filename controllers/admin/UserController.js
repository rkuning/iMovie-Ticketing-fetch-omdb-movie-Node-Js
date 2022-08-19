const { encryptPw } = require("../../helpers/bcrypt");
const { user, patty } = require("../../models");

class UserController {
  static async getUsers(req, res) {
    try {
      let users = await user.findAll();

      res.status(200).json({
        layout: "./admin/partials/main-layout",
        title: `iMovieXXI Administrator - Users`,
        msg: ``,
        users,
      });
      // res.status(200).render("./admin/pages/user/indexUsers", {
      //   layout: "./admin/partials/main-layout",
      //   title: `iMovieXXI Administrator - Users`,
      //   msg: ``,
      //   users,
      // });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { name, phone, password } = req.body;
      let valUser = await user.findOne({ where: { phone } });
      if (valUser !== null) {
        let users = await user.findAll();
        res.status(200).render("./admin/pages/user/indexUsers", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Users`,
          msg: `Phone already registered!`,
          users,
        });
      } else {
        let resReg = await user.create({ name, phone, password });
        const userId = resReg.id;
        await patty.create({ userId });
        let users = await user.findAll();
        res.status(201).render("./admin/pages/user/indexUsers", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Users`,
          msg: `Create Succesfully!`,
          users,
        }); //register sukses
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updatePage(req, res) {
    try {
      const id = +req.params.id;
      let resUser = await user.findAll({ where: { id } });
      res.status(200).render("./admin/pages/user/editUser", {
        layout: "./admin/partials/main-layout",
        title: `iMovieXXI Administrator - Update User`,
        msg: ``,
        resUser,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;

      const { password, level, status } = req.body;
      let result = await user.update({ level, status }, { where: { id } });
      if (result[0] === 1) {
        let users = await user.findAll();
        res.status(201).redirect("/api/users");
      } else {
        res.status(404).json({ msg: `not found` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      await patty.destroy({ where: { id } });
      let result = await user.destroy({ where: { id } });
      let users = await user.findAll();
      if (result === 1) {
        res.status(200).render("./admin/pages/user/indexUsers", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Users`,
          msg: `Delete succesfully!`,
          users,
        });
      } else {
        res.status(404).json({ msg: `not found` });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;

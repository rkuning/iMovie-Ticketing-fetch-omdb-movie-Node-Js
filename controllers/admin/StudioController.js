const { studio } = require("../../models");

class StudioController {
  static async getStudios(req, res) {
    try {
      let studios = await studio.findAll();
      res.status(200).render("./admin/pages/studio/indexStudios", {
        layout: "./admin/partials/main-layout",
        title: `iMovieXXI Administrator - Studios`,
        msg: ``,
        studios,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { name } = req.body;
      let valName = await studio.findOne({ where: { name } });
      if (valName !== null) {
        let studios = await studio.findAll();
        res.status(200).render("./admin/pages/studio/indexStudios", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Studios`,
          msg: `Studio name already registered!`,
          studios,
        });
      } else {
        let result = await studio.create({ name });
        let studios = await studio.findAll();
        res.status(201).render("./admin/pages/studio/indexStudios", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Studios`,
          msg: `Create successfully!`,
          studios,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updatePage(req, res) {
    try {
      const id = +req.params.id;
      let resStd = await studio.findAll({ where: { id } });
      res.status(200).render("./admin/pages/studio/editStudio", {
        layout: "./admin/partials/main-layout",
        title: `iMovieXXI Administrator - Update Studio`,
        msg: ``,
        resStd,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { name } = req.body;
      let valName = await studio.findOne({ where: { name } });
      if (valName !== null) {
        const id = +req.params.id;
        let resStd = await studio.findAll({ where: { id } });
        res.status(200).render("./admin/pages/studio/editStudio", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Update Studio`,
          msg: `Studio name already registered!`,
          resStd,
        });
      } else {
        let result = await studio.update({ name }, { where: { id } });
        if (result[0] === 1) {
          res.status(201).redirect("/api/studios");
        } else {
          let studios = await studio.findAll();
          res.status(404).render("./admin/pages/studio/indexStudios", {
            layout: "./admin/partials/main-layout",
            title: `iMovieXXI Administrator - Studios`,
            msg: `Not found!`,
            studios,
          });
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await studio.destroy({ where: { id } });
      if (result === 1) {
        let studios = await studio.findAll();
        res.status(200).render("./admin/pages/studio/indexStudios", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Studios`,
          msg: `Delete successfully!`,
          studios,
        });
      } else {
        let studios = await studio.findAll();
        res.status(404).render("./admin/pages/studio/indexStudios", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Studios`,
          msg: `Not found!`,
          studios,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = StudioController;

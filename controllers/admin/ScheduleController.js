const { schedule } = require("../../models");

class ScheduleController {
  static async getSchedules(req, res) {
    try {
      let schedules = await schedule.findAll();
      res.status(200).render("./admin/pages/schedule/indexSchedules", {
        layout: "./admin/partials/main-layout",
        title: `iMovieXXI Administrator - Schedules`,
        msg: ``,
        schedules,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { time } = req.body;
      let valTime = await schedule.findOne({ where: { time } });
      let schedules = await schedule.findAll();
      if (valTime !== null) {
        res.status(200).render("./admin/pages/schedule/indexSchedules", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Schedules`,
          msg: `Time already registered!`,
          schedules,
        });
      } else {
        await schedule.create({ time });
        res.status(201).render("./admin/pages/schedule/indexSchedules", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Schedules`,
          msg: `Add successfully!`,
          schedules,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await schedule.destroy({ where: { id } });
      let schedules = await schedule.findAll();
      if (result === 1) {
        res.status(200).render("./admin/pages/schedule/indexSchedules", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Schedules`,
          msg: `Delete successfully!`,
          schedules,
        });
      } else {
        res.status(404).render("./admin/pages/schedule/indexSchedules", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Schedules`,
          msg: `Not found!`,
          schedules,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ScheduleController;

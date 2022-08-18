const { seat } = require("../../models");

class SeatController {
  static async getSeats(req, res) {
    try {
      let seats = await seat.findAll({
        order: [["no_seat"]],
      });
      res.status(200).render("./admin/pages/seat/indexSeats", {
        layout: "./admin/partials/main-layout",
        title: `iMovieXXI Administrator - Seats`,
        msg: ``,
        seats,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async create(req, res) {
    try {
      const { no_seat } = req.body;
      let valSeat = await seat.findOne({ where: { no_seat } });
      if (valSeat !== null) {
        let seats = await seat.findAll({
          order: [["no_seat"]],
        });
        res.status(200).render("./admin/pages/seat/indexSeats", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Seats`,
          msg: `No seat already registered!`,
          seats,
        });
      } else {
        await seat.create({ no_seat });
        let seats = await seat.findAll({
          order: [["no_seat"]],
        });
        res.status(200).render("./admin/pages/seat/indexSeats", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Seats`,
          msg: `Create Successfully!`,
          seats,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await seat.destroy({ where: { id } });
      let seats = await seat.findAll({
        order: [["no_seat"]],
      });
      if (result === 1) {
        res.status(200).render("./admin/pages/seat/indexSeats", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Seats`,
          msg: `Delete Successfully!`,
          seats,
        });
      } else {
        res.status(200).render("./admin/pages/seat/indexSeats", {
          layout: "./admin/partials/main-layout",
          title: `iMovieXXI Administrator - Seats`,
          msg: `Not found!`,
          seats,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = SeatController;

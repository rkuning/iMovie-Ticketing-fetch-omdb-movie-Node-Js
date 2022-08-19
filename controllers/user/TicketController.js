const { movie, patty, ticket, studio, seat, schedule } = require("../../models");

class TicketController {
  static async ticketPage(req, res) {
    try {
      let showMovies = [];
      const user = req.cookies.user;
      const imdbId = req.params.imdbId;
      let tampilTanggal = new Date().toISOString().slice(0, 10);
      let tampilTanggal2 = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      let date2Text = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString().slice(0, 3);
      let { balance } = await patty.findOne({ where: { userId: user.id } });
      balance = balance.toLocaleString();
      let studios = await studio.findAll();
      let schedules = await schedule.findAll();
      let datMovie = await movie.findOne({ where: { imdbId } });
      await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=d4c2bbe5`)
        .then((response) => response.json())
        .then((resp) => {
          const { Title, Year, Poster, Genre } = resp;
          let id = datMovie.id;
          let title = Title;
          let year = Year;
          let poster = Poster;
          let genre = Genre;
          let price = datMovie.price;
          let status = datMovie.status;
          return showMovies.push({ id, imdbId, title, year, genre, price, status, poster });
        });
      res.status(200).render("./user/ticket/ticketIndex", {
        layout: "./user/partials/main-layout",
        title: `iMovieXXI Ticket`,
        msg: ``,
        showMovies,
        user,
        balance,
        tampilTanggal,
        tampilTanggal2,
        date2Text,
        studios,
        schedules,
      });
    } catch (err) {}
  }

  static async getDataFromDb(req, res) {
    try {
      let seats = await seat.findAll({ attributes: ["id", "no_seat"], order: [["id"]] });
      let movies = await movie.findAll();
      let tickets = await ticket.findAll();

      res.json({ seats, tickets, movies });
    } catch (err) {
      res.json(err);
    }
  }
  static async detailTicket(req, res) {
    try {
      const id = req.cookies.user.id;
      const phone = req.cookies.user.phone;
      const userId = id;
      let detailTickets = [];
      let datTicket = await ticket.findAll({ include: [schedule, studio, movie, seat], where: { userId } });
      let idTicket = await ticket.findAll({ attributes: ["id"] }, { where: { userId } });
      for (let i in datTicket) {
        await fetch(`http://www.omdbapi.com/?i=${datTicket[i].movie.imdbId}&apikey=d4c2bbe5`)
          .then((response) => response.json())
          .then((result) => {
            detailTickets.push({
              ticketId: idTicket[i].id,
              userId: datTicket[i].userId,
              phone: phone,
              date: datTicket[i].date,
              time: datTicket[i].schedule.time,
              studio: datTicket[i].studio.name,
              imdbId: datTicket[i].movie.imdbId,
              price: datTicket[i].movie.price,
              title: result.Title,
              seat: datTicket[i].seat.no_seat,
            });
          });
      }
      res.json(detailTickets);
    } catch (err) {
      res.json(err);
    }
  }

  static async getTicket(req, res) {
    try {
      const id = req.cookies.user.id;
      const phone = req.cookies.user.phone;
      const userId = id;

      let tickets = [];

      let datTicket = await ticket.findAll({ include: [schedule, studio, movie, seat], where: { userId } });
      let idTicket = await ticket.findAll({ attributes: ["id"] }, { where: { userId } });
      let { balance } = await patty.findOne({ where: { userId } });
      for (let i in datTicket) {
        await fetch(`http://www.omdbapi.com/?i=${datTicket[i].movie.imdbId}&apikey=d4c2bbe5`)
          .then((response) => response.json())
          .then((result) => {
            tickets.push({
              ticketId: idTicket[i].id,
              userId: datTicket[i].userId,
              date: datTicket[i].date,
              time: datTicket[i].schedule.time,
              studio: datTicket[i].studio.name,
              imdbId: datTicket[i].movie.imdbId,
              price: datTicket[i].movie.price,
              title: result.Title,
              seat: datTicket[i].seat.no_seat,
            });
          });
      }
      res.status(200).render("./user/ticket/dataTicket", {
        layout: "./user/partials/main-layout",
        title: `iMovieXXI Administrator - Ticket`,
        msg: ``,
        tickets,
        balance,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async ticket(req, res) {
    try {
      const user = req.cookies.user;
      const { date, scheduleId, studioId, movieId, seatId } = req.body;
      const { id } = user;
      let userId = id;
      let { balance } = await patty.findOne({ where: { userId } });
      // let { price } = await movie.findOne({ attributes: ["price"] }, { where: { id: movieId } });
      let tampilTanggal = new Date().toISOString().slice(0, 10);
      let tampilTanggal2 = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      let studios = await studio.findAll();
      let schedules = await schedule.findAll();
      let date2Text = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString().slice(0, 3);
      let showMovies = [];
      const imdbId = req.params.imdbId;
      let datMovie = await movie.findOne({ where: { imdbId } });
      let price = datMovie.price;
      let status = datMovie.status;
      await fetch(`http://www.omdbapi.com/?i=${imdbId}&apikey=d4c2bbe5`)
        .then((response) => response.json())
        .then((resp) => {
          const { Title, Year, Poster, Genre } = resp;
          let id = datMovie.id;
          let title = Title;
          let year = Year;
          let poster = Poster;
          let genre = Genre;
          return showMovies.push({ id, imdbId, title, year, genre, price, status, poster });
        });

      if (+balance < +price) {
        res.status(200).render("./user/ticket/ticketIndex", {
          layout: "./user/partials/main-layout",
          title: `iMovieXXI Ticket`,
          msg: `Balance isnt enough!`,
          showMovies,
          user,
          balance,
          tampilTanggal,
          tampilTanggal2,
          date2Text,
          studios,
          schedules,
        });
      } else {
        balance = +balance - +price;
        await patty.update({ balance }, { where: { userId } });
        let addTicket = await ticket.create({ userId, date, scheduleId, studioId, movieId, seatId });
        res.status(200).render("./user/ticket/ticketIndex", {
          layout: "./user/partials/main-layout",
          title: `iMovieXXI Ticket`,
          msg: `Buy ticket successfully!`,
          showMovies,
          user,
          balance,
          tampilTanggal,
          tampilTanggal2,
          date2Text,
          studios,
          schedules,
        });
      }
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = TicketController;

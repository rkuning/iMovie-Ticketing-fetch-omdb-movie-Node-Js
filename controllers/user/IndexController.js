const { movie, patty } = require("../../models");

class IndexController {
  static async getMovies(req, res) {
    try {
      const user = req.cookies.user;
      let { balance } = await patty.findOne({ where: { userId: user.id } });
      balance = balance.toLocaleString();
      let showMovies = [];
      let movies = await movie.findAll();
      for (let m in movies) {
        await fetch(`http://www.omdbapi.com/?i=${movies[m].imdbId}&apikey=d4c2bbe5`)
          .then((response) => response.json())
          .then((resp) => {
            const { Title, Year, Poster, Genre } = resp;
            let id = movies[m].id;
            let title = Title;
            let year = Year;
            let poster = Poster;
            let genre = Genre;
            let price = movies[m].price;
            let status = movies[m].status;
            let imdbId = movies[m].imdbId;
            return showMovies.push({ id, imdbId, title, year, genre, price, status, poster });
          });
      }
      res.status(200).render("./user/index", {
        layout: "./user/partials/main-layout",
        title: `iMovieXXI`,
        msg: ``,
        showMovies,
        user,
        balance,
      });
      // res.status(200).json({
      //   showMovies,
      //   user,
      //   balance,
      // });
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = IndexController;

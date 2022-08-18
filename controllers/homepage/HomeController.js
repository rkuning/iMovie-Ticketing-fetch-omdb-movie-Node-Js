const { movie } = require("../../models");

class HomeController {
  static async getMovies(req, res) {
    try {
      let showMovies = [];
      let movies = await movie.findAll();
      for (let m in movies) {
        await fetch(`http://www.omdbapi.com/?i=${movies[m].imdbId}&apikey=APIKEY`)
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
      res.status(200).render("./index", {
        layout: "./partials/main-layout",
        title: `iMovieXXI`,
        msg: ``,
        showMovies,
      });
    } catch (err) {
      res.json(err);
    }
  }
}

module.exports = HomeController;

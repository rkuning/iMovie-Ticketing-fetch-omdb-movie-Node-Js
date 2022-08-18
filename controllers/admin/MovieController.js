const { movie } = require("../../models");

class MovieController {
  static async getMovies(req, res) {
    try {
      let showMovies = [];
      let movies = await movie.findAll();
      for (let m in movies) {
        await fetch(`http://www.omdbapi.com/?i=${movies[m].imdbId}&apikey=APIKEY`)
          .then((response) => response.json())
          .then((resp) => {
            const { Title, Year, Poster } = resp;
            let id = movies[m].id;
            let title = Title;
            let year = Year;
            let poster = Poster;
            let price = movies[m].price;
            let status = movies[m].status;
            return showMovies.push({ id, title, year, price, status, poster });
          });
      }
      res.status(200).render("./admin/pages/movie/indexMovies", {
        layout: "./admin/partials/main-layout",
        title: `iMovieXXI Administrator - Movies`,
        msg: ``,
        showMovies,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static createPage(req, res) {
    res.status(200).render("./admin/pages/movie/addMovie", {
      layout: "./admin/partials/main-layout",
      title: `iMovieXXI Administrator - Add Movie`,
      msg: ``,
    });
  }

  static async create(req, res) {
    try {
      const { imdbId, price, status } = req.body;
      let valImdbId = await movie.findOne({ where: { imdbId } });
      if (valImdbId !== null) {
        res.status(200).json({ msg: `Imdb already registered` });
      } else {
        let result = await movie.create({ imdbId, price, status });
        res.status(201).redirect("/api/movies");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updatePage(req, res) {
    try {
      const id = +req.params.id;
      let showMovie = [];
      let datMovie = await movie.findAll({ where: { id } });
      await fetch(`http://www.omdbapi.com/?i=${datMovie[0].imdbId}&apikey=APIKEY`)
        .then((response) => response.json())
        .then((resp) => {
          const { Title, Year, Poster, Genre } = resp;
          let title = Title;
          let year = Year;
          let poster = Poster;
          let genre = Genre;
          let price = +datMovie[0].price;
          let imdbId = datMovie[0].imdbId;
          let status = datMovie[0].status;
          return showMovie.push({ id, imdbId, title, year, price, genre, poster, status });
        });
      res.status(200).render("./admin/pages/movie/editMovie", {
        layout: "./admin/partials/main-layout",
        title: `iMovieXXI Administrator - Update Movie`,
        msg: ``,
        showMovie,
      });
    } catch (err) {
      res.json(err);
    }
  }

  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { price, status } = req.body;
      let result = await movie.update({ price, status }, { where: { id } });
      result[0] === 1 ? res.status(201).redirect("/api/movies") : res.status(404).json({ msg: `not found` });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let result = await movie.destroy({ where: { id } });
      result === 1 ? res.status(200).redirect("/api/movies") : res.status(404).json({ msg: `not found` });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = MovieController;

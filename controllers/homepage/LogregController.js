const { user, patty, movie } = require("../../models");
const { decryptPw } = require("../../helpers/bcrypt");

class LogregController {
  static registerPage(req, res) {
    try {
      res.status(200).render("./homepage/register", {
        layout: "./homepage/partials/main-layout",
        title: `iMovieXXI - Register`,
        msg: ``,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async register(req, res) {
    try {
      const { name, phone, password } = req.body;
      let valUser = await user.findOne({ where: { phone } });
      if (valUser !== null) {
        res.status(200).json({ msg: `already registered` });
      } else {
        let resReg = await user.create({ name, phone, password });
        const userId = resReg.id;
        await patty.create({ userId });
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
        res.status(200).render("./homepage/register", {
          layout: "./homepage/partials/main-layout",
          title: `iMovieXXI`,
          msg: `Register Successfully!`,
          showMovies,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static loginPage(req, res) {
    try {
      res.status(200).render("./homepage/login", {
        layout: "./homepage/partials/main-layout",
        title: `iMovieXXI - Login`,
        msg: ``,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async login(req, res) {
    try {
      const { phone, password } = req.body;
      const cekUser = await user.findOne({ where: { phone } });
      if (cekUser) {
        if (decryptPw(password, cekUser.password)) {
          if (cekUser.status === "active") {
            switch (cekUser.level) {
              case `admin`:
                res.cookie("user", cekUser);
                res.status(200).redirect("/api"); // halaman untuk adm
                break;
              case `user`:
                res.cookie("user", cekUser);
                res.status(200).redirect(`/users`); // halaman untuk adm
                break;
            }
          } else {
            res.status(200).render("./homepage/login", {
              layout: "./homepage/partials/main-layout",
              title: `iMovieXXI - Login`,
              msg: `Cant reach your account because some reason!`,
            });
          }
        } else {
          res.status(200).render("./homepage/login", {
            layout: "./homepage/partials/main-layout",
            title: `iMovieXXI - Login`,
            msg: `Wrong password!`,
          });
        }
      } else {
        res.status(200).render("./homepage/login", {
          layout: "./homepage/partials/main-layout",
          title: `iMovieXXI - Login`,
          msg: `User not found!`,
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = LogregController;

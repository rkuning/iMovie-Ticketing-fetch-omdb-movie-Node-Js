const movieRoute = require("express").Router();
const { MovieController } = require("../../controllers");

movieRoute.get("/", MovieController.getMovies);
movieRoute.get("/add", MovieController.createPage);
movieRoute.post("/add", MovieController.create);
movieRoute.get("/update/:id", MovieController.updatePage);
movieRoute.post("/update/:id", MovieController.update);
movieRoute.get("/:id", MovieController.delete);

module.exports = movieRoute;

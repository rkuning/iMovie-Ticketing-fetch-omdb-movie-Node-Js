const studioRoute = require("express").Router();
const { StudioController } = require("../../controllers");

studioRoute.get("/", StudioController.getStudios);
studioRoute.post("/", StudioController.create);
studioRoute.get("/update/:id", StudioController.updatePage);
studioRoute.post("/update/:id", StudioController.update);
studioRoute.get("/:id", StudioController.delete);

module.exports = studioRoute;

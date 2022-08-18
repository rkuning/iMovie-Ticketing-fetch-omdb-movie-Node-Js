const apiRoute = require("express").Router();
const userRoutes = require("./userRoute");
const pattyRoutes = require("./pattyRoute");
const seatRoutes = require("./seatRoute");
const scheduleRoutes = require("./scheduleRoute");
const studioRoutes = require("./studioRoute");
const movieRoutes = require("./movieRoute");
const voucherRoutes = require("./voucherRoute");

apiRoute.get("/", (req, res) => {
  const user = req.cookies.user;
  res.render("./admin/pages/index", {
    layout: "./admin/partials/main-layout",
    title: `iMovieXXI Administrator`,
    user,
  });
});
apiRoute.use("/users", userRoutes);
apiRoute.use("/patties", pattyRoutes);
apiRoute.use("/seats", seatRoutes);
apiRoute.use("/schedules", scheduleRoutes);
apiRoute.use("/studios", studioRoutes);
apiRoute.use("/movies", movieRoutes);
apiRoute.use("/vouchers", voucherRoutes);

module.exports = apiRoute;

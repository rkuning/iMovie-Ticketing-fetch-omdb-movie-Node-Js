const userRoute = require("express").Router();
const { IndexController, TicketController, ProfilController } = require("../../controllers");

userRoute.get("/", IndexController.getMovies);
userRoute.get("/ticket", TicketController.getTicket);
userRoute.get("/profil", ProfilController.getProfil);
userRoute.get("/ticket/:imdbId", TicketController.ticketPage);
userRoute.post("/ticket/:imdbId", TicketController.ticket);
userRoute.get("/getDataFromDb", TicketController.getDataFromDb);
userRoute.get("/detailTicket", TicketController.detailTicket);

module.exports = userRoute;

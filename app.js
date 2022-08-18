require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => console.log(`App running on port ${PORT}...`));

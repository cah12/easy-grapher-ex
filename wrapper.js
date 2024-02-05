const path = require("path");

//Remember to set heroku env. variables for production.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  //process.env.FILESYSTEM_DATABASE_URL = process.env.FILESYSTEM_LOCAL_DATABASE_URL;
}

const express = require("express");
const app = express();

const options = {
  // white_list: [
  //   "http://127.0.0.1:5500",
  //   // "http://localhost:3500/",
  //   //"https://cah12.github.io/easy-grapher/",
  //   "https://cah12.github.io",
  // ], //default: undefined
  //access_token_expiry: "15s", //default: 900s
  // cookie_max_age: 1000 * 60 * 60, //default: 1000 * 60 * 60 * 24 (1 day)
  //cookie_secure: false, //default: true
};

//Only needed for same domain (i.e. when no whitelist is provided in options argument).
const { router, authenticateToken, getUserFs } =
  require("mongo-db-filesystem-ex")(app, options);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "140mb", extended: true }));

app.use(express.static(path.join(__dirname, "public", "www-built")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server started on PORT http://localhost:${PORT}`);
});

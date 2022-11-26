//Remember to set heroku env. variables for production.
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
  //process.env.FILESYSTEM_DATABASE_URL = process.env.FILESYSTEM_LOCAL_DATABASE_URL;
}

const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(express.json({ limit: "140mb", extended: true }));

const fs = require("file-system-mongo");
const fileSystemRoutes = require("file-system-routes")(fs);
app.use(fileSystemRoutes);

app.use(express.static(path.join(__dirname, "public", "www-built")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server started on PORT " + PORT);
});

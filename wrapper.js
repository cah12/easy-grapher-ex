const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public", "www-built")));

const PORT = process.env.PORT||5000;
app.listen(PORT, function () {
  console.log("Server started on PORT " + PORT);
});

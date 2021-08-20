/*Add the name of the folder to be made static to the "folder" variable.*/

const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
var cookieParser = require("cookie-parser");
const { count } = require("console");

const folder = "www-built";

function incrementCount() {
  fs.readFile("count.txt", "utf8", (err, data) => {
    var count = 1;
    if (!err) count += parseInt(data);
    fs.writeFile("count.txt", count, "utf8", function (err) {
      if (err) console.log("error:", err);
    });
  });
}

function clearCount() {
  fs.readFile("count.txt", "utf8", (err, data) => {
    if (!err) {
      fs.writeFile("count.txt", 0, "utf8", function (err, data) {
        if (err) console.log("error:", err);
      });
    }
  });
}

app.get("/clearCount", (req, res) => {
  clearCount();
  res.send("Count set to 0.");
});

app.get("/count", (req, res) => {
  fs.readFile("count.txt", "utf8", (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      res.send("Counter Error");
    }
  });
});

var debounce = false;
function siteVisits(req, res, next) {
  if (req.cookies.firstVisit && debounce) {
    next();
    return;
  }
  if (!req.cookies.firstVisit && !debounce) {
    //console.log("increment counter");
    incrementCount();
    debounce = true;
    setTimeout(function () {
      debounce = false;
    }, 10000);
  }
  next();
}
app.use(cookieParser());
app.use(siteVisits);
app.use(express.static(path.join(__dirname, "public", folder)));

const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log("Server started on PORT " + PORT);
});

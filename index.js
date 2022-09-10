const db = process.env.db
const port = process.env.port
const express = require("express");
const app = express();
const path = require("path");

//setup
app.set("view engine", "ejs");
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/js", express.static(path.join(__dirname, "public/js")));

onLaunch = async () => {
  await require("./src/utilities/db").connectDB(db);
  await require("./src/utilities/schedule")();
};

app.listen(port, async () => {
  console.log("Listening to the server on http://ngtracker.ml");
  await onLaunch();
});

//requests
app.get("/", async (req, res) => {
  await require("./src/requests/home")(req, res);
});
app.get("/home", async (req, res) => {
  await require("./src/requests/home")(req, res);
});

app.get("/track/:name", async (req, res) => {
  await require("./src/requests/trackName")(req, res);
});

app.get("/track", async (req, res) => {
  await require("./src/requests/track")(req, res);
});

app.get("/guild", async (req, res) => {
  await require("./src/requests/guild")(req, res);
});

app.get("/guild/:name", async (req, res) => {
  await require("./src/requests/guildName")(req, res);
});

app.get("/about", async (req, res) => {
  await require("./src/requests/about")(req, res);
});

app.get("/leaderboards", async (req, res) => {
  await require("./src/requests/leaderboards")(req, res);
});


app.get("/player/:name", async (req, res) => {
  await require("./src/requests/player")(req, res);
});



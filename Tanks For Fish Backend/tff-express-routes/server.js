"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ejs = require("ejs")
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

const adminRoutes = require("./routes/admin.route");
const productRoutes = require("./routes/tff.route");

const { db_close } = require("./models/db-conn");

app.use("/products", productRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
    res.redirect("/products/all");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function () {
  console.log("App listening at http://localhost:" + PORT);
});

process.on("SIGINT", cleanUp);
function cleanUp() {
  console.log("Terminate signal received.");
  db_close();
  console.log("...Closing HTTP server.");
  server.close(() => {
    console.log("...HTTP server closed.")
  })
}
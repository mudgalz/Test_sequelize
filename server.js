const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const controller = require("./items.controller");
const db = require("./db");

// Create table if not exist
db.sequelize.sync();

// Test
app.get("/", function (req, res) {
  res.send("Server Working");
});

// Create Items
app.post("/items/new", function (req, res) {
  controller.createItem(req, res);
});

// Fetch All Items
app.get("/items", function (req, res) {
  controller.findAllItems(req, res);
});

// Fetch Single Item By Name (Primary Key)
app.get("/items/:name", function (req, res) {
  controller.findItemByName(req, res);
});

// Update Item By Name (Primay Key)
app.put("/items/update", function (req, res) {
  controller.updateItem(req, res);
});

// Delete Item By Name (Primay Key)
app.delete("/items/delete/:name", function (req, res) {
  controller.deleteItem(req, res);
});

app.listen(3000, () => {
  console.log("Server is active on port 3000");
});

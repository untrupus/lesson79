const express = require("express");
const app = express();
const categories = require("./app/categories");
const items = require("./app/items");
const places = require("./app/places");
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use("/categories", categories);
app.use("/items", items);
app.use("/places", places);

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});
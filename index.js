const express = require("express");
const app = express();
const mysql = require("mysql");
const categories = require("./app/categories");
const items = require("./app/items");
const places = require("./app/places");
const port = 8000;
const config = require("./config");

const connection = mysql.createConnection(config.db);

app.use(express.json());
app.use(express.static('public'));
app.use("/categories", categories(connection));
// app.use("/items", items);
app.use("/places", places);

connection.connect((err) => {
   if (err) {
       console.log(err);
       throw err;
   }
   console.log("Connected");
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
});


const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then((db) => console.log("DB CONECTADO"))
  .catch((err) => console.error(err));

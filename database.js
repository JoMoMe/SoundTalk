const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://soundtalk.eoijz.mongodb.net/myFirstDatabase", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then((db) => console.log("DB CONECTADO"))
  .catch((err) => console.error(err));

const mongoose = require("mongoose");

const URI = "mongodb://localhost/mean-crud";

mongoose.connect(URI, {

  useNewUrlParser: true, 
  
  useUnifiedTopology: true 
  
  }, err => {
  if(err) throw err;
  console.log('Connected to MongoDB!!!')
  });

module.exports = mongoose;

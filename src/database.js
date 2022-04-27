const mongoose = require("mongoose");

const uri = "mongodb+srv://Oliver:Lkx4rcmmWUzWVIFw@soundtalk.eoijz.mongodb.net/SoundTalk?retryWrites=true&w=majority";

try {
    mongoose.connect(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    },  () => console.log("BD CONECTADA BEBE"));    
}
catch (error) { 
  throw err;
}
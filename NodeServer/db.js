const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost:27017/MyMandalDemoDB", 
  function (err) {
    if (!err) {
      console.log("MongoDB coneection SuccsessFul port 27017...");
    } else {
      console.log("Error In DB Setup" + JSON.stringify(err, undefined, 2))
    }
  });
  
const connection = mongoose.connection;

autoIncrement.initialize(connection);

module.exports = mongoose;

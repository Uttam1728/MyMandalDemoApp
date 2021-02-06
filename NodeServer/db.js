const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb://localhost:27017/MyMandalDemoDB", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },
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

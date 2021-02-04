const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/MyMandalDemoDB",
                function (err) {
                    if (!err) {
                        console.log("MongoDB coneection SuccsessFul port 27017...");
                    }
                    else {
                        console.log("Error In DB Setup" + JSON.stringify(err,undefined,2))
                    }
                });

module.exports = mongoose;
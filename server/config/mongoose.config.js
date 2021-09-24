const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/fitnessDiet", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      "successfully connected to the database, collection: fitnessDiet"
    );
  })
  .catch((err) => console.log("cannot connect to the database ", err));

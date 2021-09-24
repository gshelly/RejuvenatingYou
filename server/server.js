require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./config/mongoose.config");
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/food.routes")(app);
require("./routes/user.routes")(app);

app.listen(process.env.PORT, () => {
  console.log(
    "Server Successfully Activated\n ----------------------------------------------------"
  );
});

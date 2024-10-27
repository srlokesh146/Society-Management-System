const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
<<<<<<< Updated upstream
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const constant = require("./src/config/constant.js");
const port = constant.PORT;
require("./src/config/db");
const cors = require("cors");

// for all origin
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, origin);
  },
  credentials: true,
};
=======
const cookieParser=require("cookie-parser")
app.use(cookieParser())
const constant=require("./src/config/constant.js")
const port = constant.PORT
require("./src/config/db")
const cors=require("cors")
app.use(cors())
const SocietyRoutes=require("./src/routes/society.route")
const UserRoutes= require("./src/routes/user.route");
const NumberRoutes=require("./src/routes/number.route.js")
const ResidentRoute=require("./src/routes/resident.route.js")
>>>>>>> Stashed changes

app.use(cors(corsOptions));
const SocietyRoutes = require("./src/routes/society.route");
const UserRoutes = require("./src/routes/user.route");
const NumberRoutes = require("./src/routes/number.route.js");

//user registration and login schema
app.use("/api/v1/auth", UserRoutes);

//create society api
app.use("/api/v1/society", SocietyRoutes);
//create Important Number
app.use("/api/v2/number", NumberRoutes);

<<<<<<< Updated upstream
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
=======
//resident apis
app.use("/api/v2/resident",ResidentRoute)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
>>>>>>> Stashed changes

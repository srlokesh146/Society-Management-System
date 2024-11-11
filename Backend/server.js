const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
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


app.use(cors(corsOptions));
const SocietyRoutes = require("./src/routes/society.route");
const UserRoutes = require("./src/routes/user.route");
const NumberRoutes = require("./src/routes/number.route.js");
const ResidentRoute=require("./src/routes/resident.route.js")
const ComplaintRoutes=require("./src/routes/ComplaintTracking.route.js")
const SecurityRoutes=require("./src/routes/security.route.js")
const FacilityRoute=require("./src/routes/facility.route.js")
const AnnouncementRoute=require("./src/routes/announcement.route.js")
const FinancialRoutes=require("./src/routes/Financial.route.js")
const VisitorRoutes=require("./src/routes/visitor.route.js")
const AlertRoutes= require("./src/routes/alert.route.js")

//user registration and login schema
app.use("/api/v1/auth", UserRoutes);
//create society api
app.use("/api/v1/society", SocietyRoutes);
//create Important Number
app.use("/api/v2/number", NumberRoutes);
//resident apis
app.use("/api/v2/resident",ResidentRoute)
//complaint apis
app.use("/api/v2/complaint",ComplaintRoutes)
//security apis
app.use("/api/v2/security",SecurityRoutes)
//facility apis
app.use("/api/v2/facility",FacilityRoute)
//Announcement apis
app.use("/api/v2/announcement",AnnouncementRoute)
//financial apis
app.use("/api/v2/financial",FinancialRoutes)
//visitor api
app.use("/api/v2/visitor",VisitorRoutes)
//alert api
app.use("/api/v2/alert",AlertRoutes)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

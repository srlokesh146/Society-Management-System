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
const cron = require("node-cron");

// socket io connections
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

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
const ResidentRoute = require("./src/routes/resident.route.js");
const ComplaintRoutes = require("./src/routes/ComplaintTracking.route.js");
const SecurityRoutes = require("./src/routes/security.route.js");
const FacilityRoute = require("./src/routes/facility.route.js");
const AnnouncementRoute = require("./src/routes/announcement.route.js");
const FinancialRoutes = require("./src/routes/Financial.route.js");
const VisitorRoutes = require("./src/routes/visitor.route.js");
const AlertRoutes = require("./src/routes/alert.route.js");
const chatRoute = require("./src/routes/chat.route.js");
const PenaltyController = require("./src/controller/Financial.controller.js");
const PollRoutes = require("./src/routes/poll.route.js");
const NotificationRoute=require("./src/routes/notification.route.js")


cron.schedule("0 0 * * * *", async () => {
  try {
    console.log("Starting scheduled penalty application...");
    await PenaltyController.applyPenalty();
    console.log("Scheduled penalty application completed.");
  } catch (error) {
    console.error("Error in scheduled penalty application:", error.message);
  }
});

//user registration and login schema
app.use("/api/v1/auth", UserRoutes);
//create society api
app.use("/api/v1/society", SocietyRoutes);
//create Important Number
app.use("/api/v2/number", NumberRoutes);
//resident apis
app.use("/api/v2/resident", ResidentRoute);
//complaint apis
app.use("/api/v2/complaint", ComplaintRoutes);
//security apis
app.use("/api/v2/security", SecurityRoutes);
//facility apis
app.use("/api/v2/facility", FacilityRoute);
//Announcement apis
app.use("/api/v2/announcement", AnnouncementRoute);
//financial apis
app.use("/api/v2/financial", FinancialRoutes);
//visitor api
app.use("/api/v2/visitor", VisitorRoutes);
//alert api
app.use("/api/v2/alert", AlertRoutes);
//chat api
app.use("/api/v2/chat", chatRoute);
//poll apis
app.use("/api/v2/poll", PollRoutes);
//notification apis 
app.use("/api/v2/notication",NotificationRoute)



app.get("/", (req, res) => res.send("Hello World!"));

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);


// socket io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  
  // connect users
  socket.on("join", ({ userId, receiverId }) => {
    socket.userId = userId;
    socket.receiverId = receiverId;
  });

  // send message
  socket.on("sendMessage", ({ userId, receiverId, message }) => {
    // add media
    const newMessage = { userId, receiverId, message };
    io.to(socket.id).emit("sendMessage", newMessage);
  });

  io.on("disconnect", () => {
    console.log("user disconnect!");
  });
});

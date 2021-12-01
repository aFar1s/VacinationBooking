require("dotenv").config({ path: "./config.env" });
const express = require('express')
const mongoose = require("mongoose");
const errorHandler = require("./utility/errorHandler")


// CONFIGURATION
const app = express();
const port = process.env.PORT ?? 4001;

// Middleware
app.use(express.json());
const cors = require("cors");
app.use(cors());
//For Heroku
// const path = require("path");
// app.use(express.static(path.join(__dirname, "./client/build")));


// CONNECT TO MONGODB
const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    })

    .then
        mongoose.connection.on("open", () => {
            console.log(
            `Connection to MongoDB ${process.env.MONGODB_URI ? "Atlas" : ""} is open`
            );
            }
        );
};
connectDB();

// Login Route
const authController = require("./controllers/auth");
app.use("/api/auth", authController);

// Bookings Route
// const bookingsController = require("./controllers/bookings");
// app.use("/api/bookings", bookingsController);

// For Heroku
// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/build", "index.html"));
//   }
// );

app.use(errorHandler);

  

// Listener
app.listen(port, () => {
    console.log(`Express server is live at ${port}...`);
  }
);

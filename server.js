require("dotenv").config({ path: "./config.env" });
const express = require('express')
const mongoose = require("mongoose");

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

// Friend Routes
const friendController = require("./controllers/friend");
app.use("/api/friend", friendController);

// For Heroku
// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./client/build", "index.html"));
//   }
// );
  

// Listener
app.listen(port, () => {
    console.log(`Express server is live at ${port}...`);
  }
);

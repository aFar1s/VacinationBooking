const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

let date1 = new Date();
date1.setDate(date1.getDate() + 30);
const dateString1 = date1.toISOString().split("T")[0];

let date2 = new Date();
date2.setDate(date1.getDate() + 60);
const dateString2 = date2.toISOString().split("T")[0];



const bookingsSchema = Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  firstJab: { type: Date, default: dateString1 },
  secondJab: { type: Date, default: dateString2 },
  vacinationCentre: { type: String }
});

const Bookings = model("Bookings", bookingsSchema);

module.exports = Bookings;

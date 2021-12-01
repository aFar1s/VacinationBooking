const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const bookingsSchema = Schema({
  center: { type: mongoose.Schema.Types.ObjectId, ref: "vaccinationcenters" },
  firstJab: { type: Date },
  secondJab: { type: Date },
  timeSlot: { type: String, unique: true }
});

const Bookings = model("SlotBookings", bookingsSchema);

module.exports = Bookings;

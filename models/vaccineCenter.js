const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const VaccineCenterSchema = Schema({
    location: { type: String },
    postalCode: { type: String},
    vaccine: { type: String }
  });
  
  const VaccineCenter = model("Bookings", VaccineCenterSchema);
  
  module.exports = VaccineCenter;
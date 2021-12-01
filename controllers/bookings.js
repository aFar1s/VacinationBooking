const express = require("express");
const router = express.Router();
const Booking = require("../models/bookings")

//* Create Route
router.post("/createBooking", async (req, res) => {
    const booking = new Booking(req.body);
    await booking.save()
    .then(
        (newBooking) => res.status(200).json(newBooking))
    .catch(
        (err) => res.status(400).json("Error " + err))
})


module.exports = router;

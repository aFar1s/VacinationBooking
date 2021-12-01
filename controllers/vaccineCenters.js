const express = require("express");
const router = express.Router();
const VacccineCenter = require("../models/vaccineCenter")

//* Read Route
router.get("/read", async (req, res) => {
    VacccineCenter.find()
    .then(
        (center) => res.json(center))
    .catch(
        (err) => res.status(400).json("Error: " + err));
})
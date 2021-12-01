const express = require("express");
const router = express.Router();
const VacccineCenter = require("../models/vaccineCenter")

//* Read Route
router.get("/read", async (req, res) => {
    await VacccineCenter.find()
    .then(
        (center) => res.json(center))
    .catch(
        (err) => res.status(400).json("Error: " + err));
})

//* Read ONE 
router.get("/read/:id", async (req, res) => {
    await VacccineCenter.find({_id: req.params.id})
    .then(
        (center) => res.json(center))
    .catch(
        (err) => res.status(400).json("Error: " + err));
})


module.exports = router;

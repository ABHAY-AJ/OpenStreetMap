const mongoose = require("mongoose");

const AreaSchema = new mongoose.Schema({
    name: String,
    coordinates: [[Number]], // Array of latitude-longitude pairs
});

module.exports = mongoose.model("Area", AreaSchema);
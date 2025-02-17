const express = require("express");
const Area = require("../models/Area");
const axios = require("axios");
const router = express.Router();

// Save Closed Area
router.post("/", async (req, res) => {
    try {
        const { name, coordinates } = req.body;
        const newArea = new Area({ name, coordinates });
        await newArea.save();
        res.json({ message: "Area saved successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Closed Areas
router.get("/", async (req, res) => {
    try {
        const areas = await Area.find();
        res.json(areas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Closed Area
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Area.findByIdAndDelete(id);
        res.json({ message: "Area deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Fetch Route from OpenRouteService
const geolib = require("geolib"); // Install using: npm install geolib

router.get("/route", async (req, res) => {
    try {
        let { start, end } = req.query;
        console.log("s",start);
        console.log("e",end);


        if (!start || !end) {
            return res.status(400).json({ error: "Start and end coordinates are required." });
        }

        // Extract and validate coordinates
        const [startLng, startLat] = start.split(",").map(Number);
        const [endLng, endLat] = end.split(",").map(Number);

        if (
            isNaN(startLat) || isNaN(startLng) || isNaN(endLat) || isNaN(endLng) ||
            startLat < -90 || startLat > 90 || startLng < -180 || startLng > 180 ||
            endLat < -90 || endLat > 90 || endLng < -180 || endLng > 180
        ) {
            return res.status(400).json({ error: "Invalid coordinates." });
        }

        // Calculate the distance between the start and end points
        const distance = geolib.getDistance(
            { latitude: startLat, longitude: startLng },
            { latitude: endLat, longitude: endLng }
        );

        // Check if the distance exceeds the API limit (6,000,000 meters)
        if (distance > 6000000) {
            return res.status(400).json({ error: "The distance between start and end points is too large (maximum 6,000 km)." });
        }
        console.log("hg",distance)

        const apiKey = process.env.OPENROUTESERVICE_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "API key is missing." });
        }

        const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLng},${startLat}&end=${endLng},${endLat}`;

        console.log("Fetching route from:", url);
        const response = await axios.get(url);

        if (!response.data || !response.data.features || response.data.features.length === 0) {
            return res.status(500).json({ error: "Invalid API response." });
        }

        res.json(response.data);
    } catch (err) {
        console.error("Error fetching route:", err.message);
        if (err.response) {
            // Forward the API error message to the frontend
            return res.status(400).json({ error: err.response.data.error.message });
        }
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
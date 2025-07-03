// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Amadeus = require("amadeus");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// ✅ Test route to check if environment variables are working
app.get("/env-test", (req, res) => {
  res.json({
    key: process.env.AMADEUS_API_KEY || "missing key",
    secret: process.env.AMADEUS_API_SECRET || "missing secret",
  });
});

// ✅ Initialize Amadeus client
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

// ✅ Base route
app.get("/", (req, res) => {
  res.send("Flight Offer API is live");
});

// ✅ Test Amadeus flight search route
app.get("/amadeus", async (req, res) => {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: "DEL",
      destinationLocationCode: "BOM",
      departureDate: "2025-07-10",
      adults: "1",
    });

    res.json(response.data);
  } catch (error) {
    console.error("Amadeus API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch Amadeus data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

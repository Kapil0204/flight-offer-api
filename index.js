// index.js
const express = require("express");
const cors = require("cors");
const Amadeus = require("amadeus");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Initialize Amadeus client
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

// Root route
app.get("/", (req, res) => {
  res.send("Flight Offer API is live");
});

// Dynamic Amadeus flight search route
app.get("/amadeus", async (req, res) => {
  const { origin, destination, departureDate, adults, travelClass } = req.query;

  if (!origin || !destination || !departureDate || !adults) {
    return res.status(400).json({ error: "Missing required query parameters" });
  }

  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      travelClass: travelClass || "ECONOMY",
      currencyCode: "INR",
    });

    res.json(response.data);
  } catch (error) {
    console.error("Amadeus API Error:", error);
    res.status(500).json({ error: "Failed to fetch Amadeus data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

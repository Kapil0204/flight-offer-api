// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const Amadeus = require("amadeus");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Base route to check if API is running
app.get("/", (req, res) => {
  res.send("Flight Offer API is live");
});

/* ----- DISABLED: Skyscanner (AirScraper) - Limit exhausted -----
app.get("/skyscanner", async (req, res) => {
  const {
    originSkyId = "JFK",
    destinationSkyId = "LAX",
    originEntityId = "27539757",
    destinationEntityId = "27539626",
    date = "2025-03-07",
  } = req.query;

  const options = {
    method: "GET",
    url: "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights",
    params: {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      currency: "USD",
      market: "US",
      countryCode: "US",
      cabinClass: "economy",
      adults: "1",
      sortBy: "best",
    },
    headers: {
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      "x-rapidapi-key": "your-scraper-api-key",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Backend error: could not fetch flight info",
      details: error.response?.data || error.message,
    });
  }
});
--------------------------------------------------------------- */

// ✅ Amadeus API setup
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

// ✅ Route to get flight offers from Amadeus
app.get("/amadeus", async (req, res) => {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: 'DEL',
      destinationLocationCode: 'BOM',
      departureDate: '2025-07-10',
      adults: '1'
    });

    res.json(response.data);
  } catch (error) {
    console.error("Amadeus API Error:", error);
    res.status(500).json({ error: "Failed to fetch Amadeus data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

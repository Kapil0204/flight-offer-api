const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Default test endpoint
app.get("/", (req, res) => {
  res.send("Flight Offer Scraper running!");
});

// NEW: Skyscanner flight data endpoint
app.get("/skyscanner", async (req, res) => {
  try {
    const response = await axios.get('https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails', {
      headers: {
        'X-RapidAPI-Key': 'c20c8406fdmsh6b8b35e214af438p1c3ab4jsn15ca574a21c5',
        'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
      },
      params: {
        legs: 'SFO%7B%7Ddestination%3A%2FLON%7Corigin%3A%2FLAX', // dummy data for now
        date: '2024-08-11',
        adults: '1',
        currency: 'USD',
        locale: 'en-US',
        market: 'en-US',
        cabinClass: 'economy',
        countryCode: 'US'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Skyscanner API failed", details: error.message });
  }
});

// Server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ------------------
// ✈️ Skyscanner Flights from AirScraper
// ------------------

app.get("/skyscanner", async (req, res) => {
  const axios = require("axios");
  const apiKey = "c20c8406fdmsh6b8b35e214af438p1c3ab4jsn15ca574a21c5
"; // Replace with your real key

  try {
    const response = await axios.get("https://airscraper.data-hub.online/api/skyscanner", {
      headers: {
        "X-API-KEY": apiKey
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Skyscanner error:", error.message);
    res.status(500).json({ error: "Skyscanner API call failed" });
  }
});

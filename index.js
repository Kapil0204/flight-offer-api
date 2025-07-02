const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Flight Offer Scraper API is running!");
});

// Skyscanner v2 route
app.get("/skyscanner", async (req, res) => {
  const {
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    date,
  } = req.query;

  // Validate required query parameters
  if (
    !originSkyId ||
    !destinationSkyId ||
    !originEntityId ||
    !destinationEntityId ||
    !date
  ) {
    return res.status(400).json({
      error:
        "Missing required parameters: originSkyId, destinationSkyId, originEntityId, destinationEntityId, and date",
    });
  }

  const options = {
    method: "GET",
    url: "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights",
    params: {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      adults: "1",
      market: "IN",
      countryCode: "IN",
      currency: "INR",
      locale: "en-IN",
      cabinClass: "economy",
      sortBy: "best",
    },
    headers: {
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      "x-rapidapi-key": "c20c8406fdmsh6b8b35e214af438p1c3ab4jsn15ca574a21c5",
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Skyscanner data",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

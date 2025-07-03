// index.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Flight Offer API is live");
});

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
      "x-rapidapi-key": "c20c8406fdmsh6b8b35e214af438p1c3ab4jsn15ca574a21c5",
    },
  };

  try {
    console.log("Request options:", options); // Log what you're sending

    const response = await axios.request(options);

    console.log("API Response:", response.data); // Log the full response

    res.json(response.data);
  } catch (error) {
    console.error("API error:", error.response?.data || error.message); // Log error details

    res.status(500).json({
      status: false,
      message: "Backend error: could not fetch flight info",
      details: error.response?.data || error.message,
    });
  }

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

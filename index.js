const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Root test route
app.get("/", (req, res) => {
  res.send("Flight Offer Scraper API is running!");
});

// ✅ Final Skyscanner route (dynamic)
app.get("/skyscanner", async (req, res) => {
  const { origin, destination, date } = req.query;

  if (!origin || !destination || !date) {
    return res
      .status(400)
      .json({ error: "Missing origin, destination, or date" });
  }

  const options = {
    method: "GET",
    url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails",
    params: {
      legs: `[{"destination":"${destination}","origin":"${origin}","date":"${date}"}]`,
      adults: "1",
      currency: "USD",
      locale: "en-US",
      market: "en-US",
      cabinClass: "economy",
      countryCode: "US",
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
    res
      .status(500)
      .json({
        error: "Failed to fetch Skyscanner data",
        details: error.message,
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

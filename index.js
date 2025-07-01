const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Dummy route to test server
app.get("/", (req, res) => {
  res.send("Flight Offer Scraper running!");
});

  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

const apiKey = "67113801348c8c920f1abc4486844553";
const axios = require("axios");

app.get("/scrape", async (req, res) => {
  const apiKey = "67113801348c8c920f1abc4486844553"; // Replace with your actual key
  const targetURL = "https://httpbin.org/ip"; // Dummy test URL

  try {
    const response = await axios.get(`http://api.scraperapi.com`, {
      params: {
        api_key: apiKey,
        url: targetURL
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Scraping failed", details: error.message });
  }
});

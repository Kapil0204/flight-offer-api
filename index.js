const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// Dynamic port for Render deployment
const PORT = process.env.PORT || 3000;

// Test route
app.get("/", (req, res) => {
  res.send("Flight Offer Scraper API is running!");
});

// SkyScraper API integration
app.get("/skyscanner", async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails',
    params: {
      legs: '%5B%7B%22destination%22%3A%22LON%22%2C%22origin%22%3A%22LAX%22%2C%22date%22%3A%222024-08-01%22%7D%5D',
      adults: '1',
      currency: 'USD',
      locale: 'en-US',
      market: 'en-US',
      cabinClass: 'economy',
      countryCode: 'US'
    },
    headers: {
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      'x-rapidapi

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const fakeFlightData = require("./data/flights.json");

app.get("/", (req, res) => {
  res.send("Flight Offer API is live");
});

// Simulated route
app.get("/search", (req, res) => {
  const { origin, destination, departureDate, returnDate, adults, travelClass, tripType } = req.query;

  const outbound = fakeFlightData.filter(f => f.direction === "outbound");
  const returning = fakeFlightData.filter(f => f.direction === "return");

  res.json({
    outbound,
    returning: tripType === "round" ? returning : []
  });
});

app.get("/offers", (req, res) => {
  const offers = [
    { portal: "MakeMyTrip", card: "ICICI Credit Card", finalPrice: 5600 },
    { portal: "EaseMyTrip", card: "HDFC Credit Card", finalPrice: 5400 },
    { portal: "Goibibo", card: "SBI Credit Card", finalPrice: 5800 }
  ];
  res.json(offers);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

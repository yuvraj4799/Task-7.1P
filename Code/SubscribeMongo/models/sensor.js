const mongoose = require('mongoose');
module.exports = mongoose.model('Sensor', new mongoose.Schema({
  id: String, // The identifier, e.g., lightName
  readings: {
    Building: String,
    Floor: String,
    Room: String,
    Status: String,
  },
  time: Date, // Timestamp
  temperature: Number, // You can add temperature or any other relevant fields
}));
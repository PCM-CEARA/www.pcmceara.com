const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  brand: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true }, // Referência ao usuário que registrou o veículo
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  reviews: {
    type: String,
  },
  ratings: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },

  product: {
    type: String,
    enum: [
      "Processor",
      "Laptop",
      "Keyboard",
      "Mouse",
      "Desktop",
      "Charger",
      "Speaker",
    ],
  },

  city: {
    type: String,
    enum: ["Mumbai", "Pune", "Banglore", "Delhi", "Kolkata", "Chennai"],
  },
  purchaseDate: Date,
});

module.exports = mongoose.model("User", UserSchema);

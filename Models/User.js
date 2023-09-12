const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const user = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  saved_recipes: [
    // {
    //   title: {
    //     type: String,
    //     required: true,
    //   },
    //   mealType: {
    //     type: [String], 
    //     required: true,
    //   },
    //   cuisineType: {
    //     type: [String], 
    //     required: true,
    //   },
    //   label: {
    //     type: String,
    //     required: true,
    //   },
    //   url: {
    //     type: String,
    //     required: true,
    //   },
    //   image: {
    //     type: String,
    //     required: true,
    //   },

    
    //   calories: {
    //     type: Number,
    //     required: true,
    //   },
    //   totalWeight: {
    //     type: Number,
    //     required: true,
    //   },
    //   totalCO2Emissions: {
    //     type: Number,
    //     required: true,
    //   },

     
    //   dietLabels: {
    //     type: [String], 
    //     required: true,
    //   },
    //   healthLabels: {
    //     type: [String], 
    //     required: true,
    //   },
    //   cautions: {
    //     type: [String],
    //     required: true,
    //   },

      
    //   ingredientLines: {
    //     type: [String], 
    //     required: true,
    //   },

     
    //   source: {
    //     type: String,
    //     required: true,
    //   },
    //   totalTime: {
    //     type: Number,
    //     required: true,
    //   },
    //   yield: {
    //     type: Number,
    //     required: true,
    //   },
    //   uri: {
    //     type: String,
    //     required: true,
    //   },
    //   created_at: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   updated_at: {
    //     type: Date,
    //     default: Date.now,
    //   },
    // },
  ],
});

const User = mongoose.model("User", user);

module.exports = User;

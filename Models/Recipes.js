const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const recipe = new mongoose.Schema({
  recipe: Object,
});

const Recipe = mongoose.model("Recipe", recipe);

module.exports = Recipe;

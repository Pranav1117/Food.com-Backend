const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const url =
  "mongodb+srv://pranavbavaskar1:qVPiQ99kn7CD8fI6@cluster0.i3ptsw5.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
  try {
    const client = await mongoose.connect(url);
    console.log("Connected to atlas");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connect };

const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const cors = require("cors");
// const { data } = require("./controller/controller");
const route = require("./Routes/routes");
app.use(
  cors({
    origin: "*",
  })
);
const { connect } = require("./config/DB");

const PORT = process.env.port;

app.use(express.json());
app.use(route);

app.use("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, async () => {
  try {
    await connect();
    // data();
    console.log(`Running on ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});

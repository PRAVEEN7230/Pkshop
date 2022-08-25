const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const productReviewRoute = require("./productReviewRoute");

const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/", productReviewRoute);

app.listen(process.env.PORT || 5003, () => {
  console.log("Product Reviews Service is running!");
  console.log("http://localhost:"+process.env.PORT)
});

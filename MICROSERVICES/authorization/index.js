const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./authRoute");

const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/", authRoute);

app.listen(process.env.PORT || 5001, () => {
  console.log("Authorization Service is running!");
  console.log("https://localhost:"+process.env.PORT)
});

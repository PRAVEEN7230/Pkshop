const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const reportRoute = require("./reportRoute");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/", reportRoute);

app.listen(process.env.PORT || 5006, () => {
  console.log("Reports Service is running!");
  console.log("http://localhost:"+process.env.PORT)
});

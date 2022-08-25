const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/userRoute");
const authRoute = require("./auth/authRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const wishlistRoute = require("./routes/wishlistRoute");
const orderRoute = require("./routes/orderRoute");
const checkoutRoute = require("./routes/checkoutRoute");
const productReviewRoute = require("./routes/productReviewRoute");

const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/wishlists", wishlistRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/productReviews", productReviewRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Pkshop api server is running!");
  console.log("http://localhost:"+process.env.PORT)
});

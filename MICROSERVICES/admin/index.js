const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const wishlistRoute = require("./routes/wishlistRoute");
const orderRoute = require("./routes/orderRoute");
const checkoutRoute = require("./routes/checkoutRoute");
const productReviewRoute = require("./routes/productReviewRoute");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/wishlists", wishlistRoute);
app.use("/orders", orderRoute);
app.use("/checkout", checkoutRoute);
app.use("/productReviews", productReviewRoute);

app.listen(process.env.PORT || 5001, () => {
  console.log("Admin service is running!");
  console.log("http://localhost:"+process.env.PORT)
});

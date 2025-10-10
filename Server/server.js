const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/ReviewRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

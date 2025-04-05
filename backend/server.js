const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const businessesRouter = require("./routes/business");
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/businesses", businessesRouter);

// Connect to MongoDB

const uri = process.env.MONGO_URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

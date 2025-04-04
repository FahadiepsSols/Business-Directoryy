const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const businessesRouter = require("./routes/business");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/businesses", businessesRouter);

// Connect to MongoDB
mongoose.connect("mongodb+srv://fahadiepsSols:CgmUCL5qjvnt2IPf@businessdirectory.q2miz.mongodb.net/businessdirectory", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

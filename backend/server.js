const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const businessesRouter = require("./routes/business");
const followingRoutes = require('./routes/following');
require('dotenv').config();
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api/businesses", businessesRouter);
app.use('/api/following', followingRoutes);


const uri = process.env.MONGO_URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

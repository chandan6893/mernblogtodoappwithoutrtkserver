const mongoose = require("mongoose");
const connectDB = process.env.DB;

console.log("MongoDB URI:", process.env.DB);

mongoose
  .connect(connectDB)
  .then(() => console.log(`CONNECTED TO DATABASE`))
  .catch((err) => console.log("CONNECTION ERROR", err));

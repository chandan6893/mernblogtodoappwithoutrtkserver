const express = require('express');
const cors = require('cors');
require('dotenv').config();
  
require("./db/connection");
const app = express();
// app.use(express.static("Public"));
const path = require('path');
app.use("/public", express.static(path.join(__dirname, "Public")));
//Middlewares
app.use(express.json());
// app.use(express.json({ limit: "10mb" })); 
// Adjust the limit as needed
// app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// productsroutes
const todoroutes = require("./routes/todoroutes");
app.use("/todo/api",todoroutes);

const PORT = 4001;

app.listen(PORT,()=>{console.log(`SERVER IS RUNNING AT ${PORT}`)})
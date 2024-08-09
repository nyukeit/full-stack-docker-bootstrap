const express = require("express");
const cors = require("cors");
const logger = require("morgan");

require("dotenv").config({ path: __dirname+'/../../.env' });
if (process.env.DATATYPE === "mongodb") {
  const mongoose = require("../db/mongodb");
}


const errorMiddleware = require("./middlewares/errorMiddleware");

const corsOptions = {
  // origin: [process.env.FRONTEND_URL, "http://localhost:5000"],
  origin: true, // Allow all origins
  credentials: true, // Allow credentials (including HTTP-only cookies)
};

// Create an Express application
const app = express();
app.use(logger("dev")).use(express.json()).use(cors(corsOptions)); // Parse JSON bodies

// ROUTER
const root = require("./routes/root");
const api = require("./routes/api");
const users = require("./routes/users");

app.use("/", root);
app.use("/api", api); // Use the routes defined in the root file with the /api prefix
app.use("/api/users", users);

// Set up error-handling middleware
app.use(errorMiddleware);
	
module.exports = app;
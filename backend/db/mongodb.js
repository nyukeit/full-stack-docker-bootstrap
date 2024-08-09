// Load environment variables from project root
require("dotenv").config({ path: __dirname+'/../../.env' });

const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {});

mongoose.connection.on('connected', () => {
  console.log('MongoDB Database connected!');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB Database connection error:', err);
});

module.exports = mongoose;
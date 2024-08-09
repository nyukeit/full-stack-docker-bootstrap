// Load environment variables from project root
require("dotenv").config({ path: __dirname+'/../../.env' });

// Get the client
const mysql = require("mysql2/promise");

// Create the connection to database
const database = mysql.createPool({
  host: process.env.MYSQL_HOST, // Service name of DB in docker-compose
  port: process.env.MYSQL_PORT, // Port inside the container NOT HOST PORT for ACCESS.
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

database
  .getConnection()
  .then(() => {
    console.log("MySQL Database connected !");
  })
  .catch((err) => {
    console.error(err);
  });


module.exports = database

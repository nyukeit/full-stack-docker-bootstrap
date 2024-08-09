const app = require("./src/app");
require("dotenv").config({ path: "../.env" });
const port = process.env.APP_PORT || 3000;

// Listen for server events
app
  .listen(port, () => {
    console.log(`Server is listening port ${port} in ${process.env.NODE_ENV}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
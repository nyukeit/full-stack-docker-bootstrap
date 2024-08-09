const express = require("express");
const root = express.Router();

// ROUTER : /
// ----------------------------------------------------
root.get("/", (req, res) => {
    res.json(`Hello👋, root/`);
});

module.exports = root;
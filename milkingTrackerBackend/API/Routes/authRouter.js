const express = require("express");
const { authUser } = require("../controllers/authControllers")
const router = express.Router();

// Single endpoint for both login and signup
// Base path /V1/auth is already set in index.js
router.post("/", authUser);

// Backward compatibility - old endpoint still works
router.post("/registorUser", authUser);

module.exports= router
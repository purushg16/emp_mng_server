const express = require("express");
const verifyEmployee = require("../../middleware/verifyEmployee");
const employeeAuth = require("../../controllers/employee/employeeAuthController");
const profile = require("../../routes/employee/profile");

const router = express.Router();
exports.router = router;

// Employee Login
router.post("/auth/login", employeeAuth.login);

// Protected routes
router.use("/profile", verifyEmployee, profile);

module.exports = router;

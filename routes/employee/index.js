const express = require("express");
const employeeAuth = require("../../controllers/employee/employeeAuthController");
const profile = require("../../routes/employee/profile");
const leave = require("../../routes/employee/leave");
const { verifyToken, isEmployee } = require("../../middleware/authMiddleware");

const router = express.Router();

// Employee Login
router.post("/auth/login", employeeAuth.login);

// Protected routes
router.use("/profile", verifyToken, profile);
router.use("/leave", verifyToken, isEmployee, leave);

module.exports = router;

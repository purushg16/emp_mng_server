const express = require("express");
const verifyEmployee = require("../../middleware/verifyEmployee");
const employeeAuth = require("../../controllers/employee/employeeAuthController");

const router = express.Router();

// Employee Login
router.post("/auth/login", employeeAuth.login);

// Protected routes
router.put(
  "/auth/update-password",
  verifyEmployee,
  employeeAuth.updatePassword
);

module.exports = router;

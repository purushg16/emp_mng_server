const express = require("express");
const router = express.Router();
const employeeController = require("../../controllers/employee/employeeAuthController");
const verifyEmployee = require("../../middleware/verifyEmployee");

router.post("/auth/login", employeeController.login);
router.put(
  "/auth/update-password",
  verifyEmployee,
  employeeController.updatePassword
);

module.exports = router;

const express = require("express");
const employeeAuth = require("../../controllers/employee/employeeAuthController");
const verifyEmployee = require("../../middleware/verifyEmployee");

const router = express.Router();

router.put("/update-password", verifyEmployee, employeeAuth.updatePassword);

router.put("/update", verifyEmployee, employeeAuth.updateProfile);

module.exports = router;

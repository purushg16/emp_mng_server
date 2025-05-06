const express = require("express");
const employeeAuth = require("../../controllers/employee/employeeAuthController");

const router = express.Router();

router.put("/update-password", employeeAuth.updatePassword);
router.put("/update", employeeAuth.updateProfile);

module.exports = router;

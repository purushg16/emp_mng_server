const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/admin/dashboardController");

router.get("/get", dashboardController.getDashboardStats);

module.exports = router;

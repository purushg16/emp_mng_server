const express = require("express");
const verifyAdmin = require("../../middleware/verifyAdmin");

const departmentRoutes = require("./department");
const leaveTypeRoutes = require("./leaveType");
const employeeRoutes = require("./employee");
const leaveRoutes = require("./leave");
const adminAuth = require("../../controllers/admin/adminAuthController");

const router = express.Router();

// Admin Login
router.post("/auth/login", adminAuth.login);

// Protected routes
router.put("/auth/change-password", verifyAdmin, adminAuth.changePassword);
router.use("/departments", verifyAdmin, departmentRoutes);
router.use("/leaveType", verifyAdmin, leaveTypeRoutes);
router.use("/employee", verifyAdmin, employeeRoutes);
router.use("/leave", verifyAdmin, leaveRoutes);

module.exports = router;

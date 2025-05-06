const express = require("express");
const router = express.Router();
const adminAuth = require("../../controllers/admin/adminAuthController");
const verifyAdmin = require("../../middleware/verifyAdmin");

router.post("/auth/login", adminAuth.login);
router.put("/auth/change-password", verifyAdmin, adminAuth.changePassword);

module.exports = router;

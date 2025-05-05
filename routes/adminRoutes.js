const express = require("express");
const router = express.Router();
const adminAuth = require("../controllers/adminAuthController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

router.post("/login", adminAuth.login);
router.put("/change-password", adminAuthMiddleware, adminAuth.changePassword);

module.exports = router;

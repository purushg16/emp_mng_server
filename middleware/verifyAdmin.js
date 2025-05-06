const jwt = require("jsonwebtoken");

module.exports = function verifyAdmin(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.adminId = decoded.adminId;
    req.userRole = decoded.role; // "admin" or "employee"
    next();
  });
};

const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" });

      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  },

  isAdmin: (req, res, next) => {
    if (req.userRole !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  },

  isEmployee: (req, res, next) => {
    if (req.userRole !== "employee") {
      return res.status(403).json({ message: "Employee access only" });
    }
    next();
  },
};

const jwt = require("jsonwebtoken");
const { error } = require("../utils/response");

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
      return error(res, "No token provided", 401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return error(res, "Invalid token", 403);
      }

      req.userId =
        decoded.role === "admin" ? decoded.adminId : decoded.employeeId;
      req.userRole = decoded.role;
      next();
    });
  },

  isAdmin: (req, res, next) => {
    if (req.userRole !== "admin") {
      return error(res, "Admin access only", 403);
    }
    next();
  },

  isEmployee: (req, res, next) => {
    if (req.userRole !== "employee") {
      return error(res, "Employee access only", 403);
    }
    next();
  },
};

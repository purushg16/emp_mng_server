const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../../models/Employee");
const LoginHistory = require("../../models/LoginHistory");
const { error, success } = require("../../utils/response");

exports.status = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ authenticated: true, role: decoded.role });
  } catch {
    res.status(403).json({ authenticated: false });
  }
};

exports.getProfile = (req, res) => {
  const { userId } = req;

  Employee.getProfile(userId, (err, profile) => {
    if (err) return error(res, err);
    if (!profile) return error(res, "Employee not found", 404);

    return success(req, res, profile, "Profile fetched successfully");
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  Employee.findOne(username, (err, result) => {
    if (err || result.length === 0)
      return error(res, "Invalid Credentials", 401);

    const employee = result[0];

    bcrypt.compare(password, employee.password, (_err2, isMatch) => {
      if (!isMatch) {
        return error(res, "Invalid Credentials", 401);
      }

      const token = jwt.sign(
        { employeeId: employee.id, role: "employee" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      LoginHistory.log(employee.id, (logErr) => {
        if (logErr) {
          console.error("Login history failed:", logErr);
        }

        LoginHistory.countByEmployeeId(employee.id, (countErr, countResult) => {
          if (countErr) {
            return error(res, countErr);
          }

          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          });

          const { password, ...safeEmployee } = employee;
          const loginCount = countResult[0].count;

          return success(
            req,
            res,
            { safeEmployee, loginCount },
            "Login successful"
          );
        });
      });
    });
  });
};

exports.updateProfile = (req, res) => {
  const { userId, userRole } = req;
  const updates = { ...req.body };

  if (updates.birthday) {
    updates.birthday = new Date(updates.birthday);
  }

  if (updates.createdAt) {
    updates.createdAt = new Date(updates.createdAt);
  }

  // Restricting Employee from updating certain fields
  if (userRole === "employee") {
    const restrictedFields = [
      "code",
      "departmentId",
      "status",
      "departmentName",
      "lastLogin",
    ];

    Object.keys(updates).forEach((key) => {
      if (restrictedFields.includes(key)) delete updates[key];
    });
  }

  if (Object.keys(updates).length === 0) {
    return error(res, "No data provided for update", 400);
  }

  Employee.update(userId, updates, (err) => {
    if (err) return error(res, err);

    return success(req, res, {}, "Profile updated successfully");
  });
};

exports.updatePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword) return error(res, "Old password is required", 400);
  if (!newPassword) return error(res, "New password is required", 400);
  if (newPassword.length < 6)
    return error(res, "password must be at least 6 characters", 400);

  Employee.findById(req.userId, (err, result) => {
    if (err || result.length === 0) {
      return error(res, "Employee not found", 404);
    }

    const employee = result[0];

    bcrypt.compare(oldPassword, employee.password, (err2, isMatch) => {
      if (err2 || !isMatch) {
        return error(res, "Old password is incorrect", 401);
      }

      bcrypt.hash(newPassword, 10, (err3, hashedPassword) => {
        if (err3) return error(res, err3);

        Employee.updatePassword(req.userId, hashedPassword, (err4) => {
          if (err4) return error(res, err4);

          return success(req, res, {}, "Password updated successfully");
        });
      });
    });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  success(req, res, {}, "Logged out successfully!");
};

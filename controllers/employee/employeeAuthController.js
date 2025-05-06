const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../../models/Employee");
const LoginHistory = require("../../models/LoginHistory");
const { error, success } = require("../../utils/response");

exports.login = (req, res) => {
  const { email, password } = req.body;

  Employee.findByEmail(email, (err, result) => {
    if (err || result.length === 0)
      return error(res, "Invalid Credentials", 401);

    const employee = result[0];

    bcrypt.compare(password, employee.password, (_err2, isMatch) => {
      if (!isMatch) return error(res, "Invalid Credentials", 401);

      const token = jwt.sign(
        { employeeId: employee.id, role: "employee" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      LoginHistory.log(employee.id, (logErr) => {
        if (logErr) console.error("Login history failed:", logErr);

        LoginHistory.countByEmployeeId(employee.id, (countErr, countResult) => {
          if (countErr) return error(res, countErr);

          const loginCount = countResult[0].count;
          return success(
            res,
            { token, employee, loginCount },
            "Login successful"
          );
        });
      });
    });
  });
};

exports.updateProfile = (req, res) => {
  const { employeeId, userRole } = req;
  const updates = { ...req.body };

  // Restricting Employee from updating certain fields
  if (userRole === "employee") {
    const restrictedFields = ["code", "departmentId", "status"];

    Object.keys(updates).forEach((key) => {
      if (restrictedFields.includes(key)) delete updates[key];
    });
  }

  if (Object.keys(updates).length === 0) {
    return error(res, "No data provided for update", 400);
  }

  Employee.update(employeeId, updates, (err) => {
    if (err) return error(res, err);

    return success(res, {}, "Profile updated successfully");
  });
};

exports.updatePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword) return error(res, "Old password is required", 400);
  if (!newPassword) return error(res, "New password is required", 400);
  if (newPassword.length < 6)
    return error(res, "password must be at least 6 characters", 400);

  Employee.findById(req.employeeId, (err, result) => {
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

        Employee.updatePassword(req.employeeId, hashedPassword, (err4) => {
          if (err4) return error(res, err4);

          return success(res, {}, "Password updated successfully");
        });
      });
    });
  });
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../../models/Employee");
const LoginHistory = require("../../models/LoginHistory");

exports.login = (req, res) => {
  const { email, password } = req.body;

  Employee.findByEmail(email, (err, result) => {
    if (err || result.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const employee = result[0];

    bcrypt.compare(password, employee.password, (_err2, isMatch) => {
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { employeeId: employee.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      LoginHistory.log(employee.id, (logErr) => {
        if (logErr) console.error("Login history failed:", logErr);

        LoginHistory.countByEmployeeId(employee.id, (countErr, countResult) => {
          if (countErr)
            return res
              .status(500)
              .json({ message: "Failed to fetch login count" });

          const loginCount = countResult[0].count;
          res.status(200).json({ token, employee, loginCount });
        });
      });
    });
  });
};

exports.updatePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({
      message:
        "Old and new password are required. New password must be at least 6 characters.",
    });
  }

  // Step 1: Get current employee
  Employee.findById(req.employeeId, (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const employee = result[0];

    // Step 2: Compare old password
    bcrypt.compare(oldPassword, employee.password, (err2, isMatch) => {
      if (err2 || !isMatch) {
        return res.status(401).json({ message: "Old password is incorrect" });
      }

      // Step 3: Hash and update new password
      bcrypt.hash(newPassword, 10, (err3, hashedPassword) => {
        if (err3)
          return res.status(500).json({ message: "Error hashing password" });

        Employee.updatePassword(req.employeeId, hashedPassword, (err4) => {
          if (err4)
            return res.status(500).json({ message: "Password update failed" });

          res.json({ message: "Password updated successfully" });
        });
      });
    });
  });
};

const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { success, error } = require("../../utils/response");

exports.login = (req, res) => {
  const { username, password } = req.body;

  Admin.findByUsername(username, (err, result) => {
    if (err || result.length === 0)
      return error(res, "Invalid credentials", 401);

    const admin = result[0];
    bcrypt.compare(password, admin.password, (_err, isMatch) => {
      if (!isMatch) return error(res, "Invalid credentials", 401);

      const token = jwt.sign(
        { adminId: admin.id, role: "admin" },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      if (admin.firstLogin) {
        Admin.updateFirstLogin(admin.id, (err2) => {
          if (err2) return error(res, err2);
          return success(res, { token, firstLogin: true }, "Login successful");
        });
      } else {
        return success(res, { token, firstLogin: true }, "Login successful");
      }
    });
  });
};

exports.changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const adminId = req.adminId;

  Admin.findByUsername("admin", (err, result) => {
    if (err || result.length === 0) return error(res, "Admin not found", 400);

    const admin = result[0];
    bcrypt.compare(oldPassword, admin.password, async (_err, isMatch) => {
      if (!isMatch) return error(res, "Incorrect old password", 400);

      const hashed = await bcrypt.hash(newPassword, 10);
      Admin.updatePassword(adminId, hashed, (err2) => {
        if (err2) return error(res, err2);
        success(res, {}, "Password changed successfully");
      });
    });
  });
};

const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;

  Admin.findByUsername(username, (err, result) => {
    if (err || result.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const admin = result[0];
    bcrypt.compare(password, admin.password, (_err, isMatch) => {
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { adminId: admin.id, role: "admin" },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      if (admin.firstLogin) {
        Admin.updateFirstLogin(admin.id, (err2) => {
          if (err2)
            return res
              .status(500)
              .json({ message: "Error updating first login flag" });
          res.status(200).json({ token, firstLogin: false });
        });
      } else {
        res.status(200).json({ token, firstLogin: false });
      }
    });
  });
};

exports.changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const adminId = req.adminId;

  Admin.findByUsername("admin", (err, result) => {
    if (err || result.length === 0)
      return res.status(400).json({ message: "Admin not found" });

    const admin = result[0];
    bcrypt.compare(oldPassword, admin.password, async (_err, isMatch) => {
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect old password" });

      const hashed = await bcrypt.hash(newPassword, 10);
      Admin.updatePassword(adminId, hashed, (err2) => {
        if (err2)
          return res.status(500).json({ message: "Error updating password" });
        res.status(200).json({ message: "Password changed successfully" });
      });
    });
  });
};

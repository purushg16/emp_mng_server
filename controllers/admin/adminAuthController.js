const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { success, error } = require("../../utils/response");

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
        { expiresIn: "1d" }
      );

      // Set secure, HttpOnly cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      const handleSuccess = () => {
        return success(
          req,
          res,
          { firstLogin: !!admin.firstLogin },
          "Login successful"
        );
      };

      if (admin.firstLogin) {
        Admin.updateFirstLogin(admin.id, (err2) => {
          if (err2) return error(res, err2);
          handleSuccess();
        });
      } else {
        handleSuccess();
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
        success(req, res, {}, "Password changed successfully");
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

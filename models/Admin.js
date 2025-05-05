const db = require("../config/db");

const Admin = {
  findByUsername: (username, cb) => {
    db.query("SELECT * FROM admin WHERE username = ?", [username], cb);
  },
  updateFirstLogin: (id, cb) => {
    db.query("UPDATE admin SET firstLogin = FALSE WHERE id = ?", [id], cb);
  },
  updatePassword: (id, hashedPassword, cb) => {
    db.query(
      "UPDATE admin SET password = ?, firstLogin = FALSE WHERE id = ?",
      [hashedPassword, id],
      cb
    );
  },
};

module.exports = Admin;

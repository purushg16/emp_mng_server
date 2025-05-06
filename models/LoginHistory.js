const db = require("../config/db");

const LoginHistory = {
  log: (employeeId, cb) => {
    db.query(
      "INSERT INTO login_history (employeeId) VALUES (?)",
      [employeeId],
      cb
    );
  },

  countByEmployeeId: (employeeId, cb) => {
    db.query(
      "SELECT COUNT(*) AS count FROM login_history WHERE employeeId = ?",
      [employeeId],
      cb
    );
  },

  findByEmployeeId: (employeeId, cb) => {
    db.query(
      "SELECT * FROM login_history WHERE employeeId = ? ORDER BY loginAt DESC",
      [employeeId],
      cb
    );
  },
};

module.exports = LoginHistory;

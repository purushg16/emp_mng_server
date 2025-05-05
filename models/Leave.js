const db = require("../config/db");

const Leave = {
  findAll: (cb) => {
    db.query(
      `SELECT l.*, 
              e.firstName, e.lastName, 
              lt.type AS leaveTypeName 
       FROM leaves l
       JOIN employee e ON l.employeeId = e.id
       JOIN leave_type lt ON l.leaveTypeId = lt.id
       ORDER BY l.postedAt DESC`,
      cb
    );
  },

  findById: (id, cb) => {
    db.query(`SELECT * FROM leaves WHERE id = ?`, [id], cb);
  },

  updateStatus: (id, status, remark, cb) => {
    db.query(
      "UPDATE leaves SET status = ?, remark = ? WHERE id = ?",
      [status, remark, id],
      cb
    );
  },

  delete: (id, cb) => {
    db.query(`DELETE FROM leaves WHERE id = ?`, [id], cb);
  },
};

module.exports = Leave;

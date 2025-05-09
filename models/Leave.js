const db = require("../config/db");
const { buildLeaveFilters } = require("../utils/queryBuilder");

const Leave = {
  create: (data, cb) => {
    const { employeeId, leaveTypeId, from, to, desc } = data;
    db.query(
      "INSERT INTO leaves (employeeId, leaveTypeId, `from`, `to`, `desc`) VALUES (?, ?, ?, ?, ?)",
      [employeeId, leaveTypeId, from, to, desc],
      cb
    );
  },

  findOverlapping: (employeeId, from, to, cb) => {
    db.query(
      `SELECT * FROM leaves 
       WHERE employeeId = ? 
          AND status != 'declined'
          AND NOT (DATE(\`to\`) < DATE(?) OR DATE(\`from\`) > DATE(?))`,
      [employeeId, from, to],
      cb
    );
  },

  countAll: ({ status = null, employeeId = null }, cb) => {
    const { whereClause, values } = buildLeaveFilters({ status, employeeId });

    const query = `SELECT COUNT(*) AS count FROM leaves l ${whereClause}`;

    db.query(query, values, cb);
  },

  findAll: (
    { status = null, employeeId = null, page = 1, page_size = 10 },
    cb
  ) => {
    const { whereClause, values } = buildLeaveFilters({ status, employeeId });

    let query = `
      SELECT l.*, 
             e.firstName, e.lastName, 
             lt.type AS leaveTypeName 
      FROM leaves l
      JOIN employee e ON l.employeeId = e.id
      JOIN leave_type lt ON l.leaveTypeId = lt.id
      ${whereClause}
      ORDER BY l.postedAt DESC
      LIMIT ? OFFSET ?
    `;

    const limit = parseInt(page_size);
    const offset = (parseInt(page) - 1) * limit;

    db.query(query, [...values, limit, offset], cb);
  },

  findById: (id, cb) => {
    db.query("SELECT * FROM leaves WHERE id = ?", [id], (err, results) => {
      if (err) return cb(err);
      cb(null, results[0]); // return single leave
    });
  },

  findByEmployeeId: (
    { employeeId, status = null, page = 1, page_size = 10 },
    cb
  ) => {
    let sql = "SELECT * FROM leaves WHERE employeeId = ?";
    const params = [employeeId];

    if (status && typeof status === "string") {
      sql += " AND status = ?";
      params.push(status);
    }

    sql += " ORDER BY postedAt DESC";

    const limit = parseInt(page_size);
    const offset = (parseInt(page) - 1) * limit;

    sql += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    db.query(sql, params, cb);
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

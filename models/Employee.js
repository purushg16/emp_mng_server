const db = require("../config/db");

const Employee = {
  findByEmail: (email, cb) => {
    db.query("SELECT * FROM employee WHERE email = ?", [email], cb);
  },

  updateLoginHistory: (id, cb) => {
    db.query(
      `UPDATE employees
       SET logins = JSON_ARRAY_APPEND(
         IFNULL(logins, JSON_ARRAY()), '$', NOW()
       ) 
       WHERE id = ?`,
      [id],
      cb
    );
  },

  updatePassword: (id, hashedPassword, cb) => {
    db.query(
      "UPDATE employee SET password = ? WHERE id = ?",
      [hashedPassword, id],
      cb
    );
  },

  create: (data, cb) => {
    const {
      firstName,
      lastName,
      email,
      status,
      mobile,
      password,
      code,
      gender,
      birthday,
      departmentId,
      country,
      city,
      address,
    } = data;

    const sql = `
      INSERT INTO employee (
        firstName, lastName, email, mobile, password,
        code, gender, birthday, departmentId,
        country, city, address, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        firstName,
        lastName,
        email,
        mobile,
        password,
        code,
        gender,
        birthday,
        departmentId,
        country,
        city,
        address,
        status || "active",
      ],
      cb
    );
  },

  countAll: ({ search = "" }, cb) => {
    const searchTerm = `%${search}%`;

    const query =
      "SELECT COUNT(*) AS count FROM employee WHERE " +
      "`firstName` LIKE ? OR `lastName` LIKE ? OR `code` LIKE ?";

    db.query(query, [searchTerm, searchTerm, searchTerm], cb);
  },

  findAll: ({ page = 1, page_size = 10, search = "" }, cb) => {
    const limit = parseInt(page_size);
    const offset = (parseInt(page) - 1) * limit;
    const searchTerm = `%${search}%`;

    const query =
      "SELECT * FROM employee WHERE " +
      "`firstName` LIKE ? OR `lastName` LIKE ? OR `code` LIKE ? " +
      "LIMIT ? OFFSET ?";

    db.query(query, [searchTerm, searchTerm, searchTerm, limit, offset], cb);
  },

  findById: (id, cb) => {
    db.query("SELECT * FROM employee WHERE id = ?", [id], cb);
  },

  getProfile: (employeeId, cb) => {
    const query = `
    SELECT 
      e.code, e.firstName, e.lastName, e.email, e.mobile, e.gender, e.birthday, 
      e.departmentId, e.country, e.city, e.address, e.createdAt,
      d.name AS departmentName
    FROM employee e
    LEFT JOIN department d ON e.departmentId = d.id
    WHERE e.id = ?
  `;
    db.query(query, [employeeId], cb);
  },

  update: (id, data, cb) => {
    const fields = [];
    const values = [];

    const protectedFields = ["code", "status", "departmentId"];

    for (let key in data) {
      if (protectedFields.includes(key)) continue;

      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    if (fields.length === 0) return cb(null);

    const sql = `UPDATE employee SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(sql, values, cb);
  },

  delete: (id, cb) => {
    db.query("DELETE FROM employee WHERE id = ?", [id], cb);
  },
};

module.exports = Employee;

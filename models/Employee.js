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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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

  findAll: (cb) => {
    db.query("SELECT * FROM employee", cb);
  },

  findById: (id, cb) => {
    db.query("SELECT * FROM employee WHERE id = ?", [id], cb);
  },

  update: (id, data, cb) => {
    const fields = [];
    const values = [];

    for (let key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }

    const sql = `UPDATE employee SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(sql, values, cb);
  },

  delete: (id, cb) => {
    db.query("DELETE FROM employee WHERE id = ?", [id], cb);
  },
};

module.exports = Employee;

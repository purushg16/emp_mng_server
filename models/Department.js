const db = require("../config/db");

const Department = {
  create: (data, cb) => {
    const { code, name, shortName } = data;
    db.query(
      "INSERT INTO department (code, name, shortName) VALUES (?, ?, ?)",
      [code, name, shortName],
      cb
    );
  },

  findAll: (cb) => {
    db.query("SELECT * FROM department", cb);
  },

  findByCode: (code, cb) => {
    db.query("SELECT * FROM department WHERE code = ?", [code], cb);
  },

  updateById: (id, data, cb) => {
    const fields = [];
    const values = [];

    if (data.code !== undefined) {
      fields.push("code = ?");
      values.push(data.code);
    }

    if (data.name !== undefined) {
      fields.push("name = ?");
      values.push(data.name);
    }

    if (data.shortName !== undefined) {
      fields.push("shortName = ?");
      values.push(data.shortName);
    }

    if (fields.length === 0) {
      return cb(new Error("No fields provided to update."), null);
    }

    const query = `UPDATE department SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(query, values, cb);
  },
};

module.exports = Department;

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

  countAll: ({ search = "" }, cb) => {
    const searchTerm = `%${search}%`;
    const query =
      "SELECT COUNT(*) AS count FROM department WHERE " +
      "`code` LIKE ? OR `name` LIKE ? OR `shortName` LIKE ?";
    db.query(query, [searchTerm, searchTerm, searchTerm], cb);
  },

  findAll: ({ page = 1, page_size = 10, search = "" }, cb) => {
    const limit = parseInt(page_size);
    const offset = (parseInt(page) - 1) * limit;
    const searchTerm = `%${search}%`;

    const query =
      "SELECT * FROM department WHERE " +
      "`code` LIKE ? OR `name` LIKE ? OR `shortName` LIKE ? " +
      "LIMIT ? OFFSET ?";

    db.query(query, [searchTerm, searchTerm, searchTerm, limit, offset], cb);
  },

  find: (id, cb) => {
    db.query("SELECT * FROM department WHERE id = ?", [id], cb);
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

  deleteById: (id, cb) => {
    db.query("DELETE FROM department WHERE id = ?", [id], cb);
  },
};

module.exports = Department;

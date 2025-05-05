const db = require("../config/db");

const LeaveType = {
  create: (data, cb) => {
    const { type, description } = data;
    db.query(
      "INSERT INTO leave_type (type, description) VALUES (?, ?)",
      [type, description],
      cb
    );
  },

  findAll: (cb) => {
    db.query("SELECT * FROM leave_type", cb);
  },

  find: (id, cb) => {
    db.query("SELECT * FROM leave_type WHERE id = ?", [id], cb);
  },

  update: (id, data, cb) => {
    const fields = [];
    const values = [];

    if (data.type !== undefined) {
      fields.push("type = ?");
      values.push(data.type);
    }

    if (data.description !== undefined) {
      fields.push("description = ?");
      values.push(data.description);
    }

    if (fields.length === 0) {
      return cb(new Error("No fields provided to update."), null);
    }

    const query = `UPDATE leave_type SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    db.query(query, values, cb);
  },

  delete: (id, cb) => {
    db.query("DELETE FROM leave_type WHERE id = ?", [id], cb);
  },
};

module.exports = LeaveType;

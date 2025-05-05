// Run once: scripts/createAdmin.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");

(async () => {
  const hashed = await bcrypt.hash("admin@123", 10);
  db.query(
    "INSERT INTO admin (username, password, firstLogin) VALUES (?, ?, ?)",
    ["admin", hashed, true],
    (err) => {
      if (err) console.error(err);
      else console.log("Admin created");
      process.exit();
    }
  );
})();

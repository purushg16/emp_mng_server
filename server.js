const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const departmentRoutes = require("./routes/department");
const adminAuthMiddleware = require("./middleware/adminAuthMiddleware");

// === Middlewares ===
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  === Routes ===
// Admin:
app.use("/api/admin", adminRoutes);
app.use("/api/admin/departments", adminAuthMiddleware, departmentRoutes);

// === Server Listener ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

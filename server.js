const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const adminAuthRoutes = require("./routes/admin/auth");
const departmentRoutes = require("./routes/admin/department");
const leaveTypeRoutes = require("./routes/admin/leaveType");
const employeeRoutes = require("./routes/admin/employee");
const leaveRoutes = require("./routes/admin/leave");

const employeeAuthRoutes = require("./routes/employee/auth");

const verifyAdmin = require("./middleware/verifyAdmin");

// === Middlewares ===
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  === Routes ===
// Admin:
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/departments", verifyAdmin, departmentRoutes);
app.use("/api/admin/leaveType", verifyAdmin, leaveTypeRoutes);
app.use("/api/admin/employee", verifyAdmin, employeeRoutes);
app.use("/api/admin/leave", verifyAdmin, leaveRoutes);

// Employee:
app.use("/api/employee", employeeAuthRoutes);

// === Server Listener ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

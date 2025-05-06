const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// === Middlewares ===
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  === Routes ===
app.use("/api/admin", require("./routes/admin"));
app.use("/api/employee", require("./routes/employee"));

// === Server Listener ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

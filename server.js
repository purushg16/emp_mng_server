const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

// === Middlewares ===
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  === Routes ===

// health check
app.get("/health", (_req, res) => {
  return res.status(200).json({ health: "good" });
});

// actual apis
app.use("/api/admin", require("./routes/admin"));
app.use("/api/employee", require("./routes/employee"));

// === Server Listener ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

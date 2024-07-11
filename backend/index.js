const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

// Connect to the database
connectToMongo();

// Initialize the express application
const app = express();
const port = 5001;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Define routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Basic route to check server status
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

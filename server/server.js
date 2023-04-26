// Import the Express framework
const express = require("express");

// Create a new instance of the Express application
const app = express();

// Import the users data from a JSON file
const users = require("./data/users.json");

// Serve the files in the public directory as static files
app.use(express.static("public"));

// Define a route that responds with the users data in JSON format
app.get("/api", (req, res) => {
  res.json({ users });
});

app.post("/api", (req, res) => {
  res.json({ users });
})

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

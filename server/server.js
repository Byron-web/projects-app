// Import the Express framework
const express = require("express");

// Create a new instance of the Express application
const app = express();

// Import the users data from a JSON file
const users = require("./data/users.json");

// Import the uuid library
const { v4: uuidv4 } = require("uuid");

// Add an id property to each user with a unique UUID
users.forEach((user) => {
  user.id = uuidv4();
});

// Serve the files in the public directory as static files
app.use(express.static("public"));

// Add middleware to parse incoming JSON data
app.use(express.json());

// Define a route that responds with the users data in JSON format
app.get("/api", (req, res) => {
  res.json({ users });
});

app.post("/api", (req, res) => {
  const { title, description } = req.body;
  const newUser = {
    id: uuidv4(),
    title,
    description,
  };

  users.push(newUser);

  res.status(201).json({ user: newUser });
});

// Update a user by ID
app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  // Find the user with the matching ID in the users array
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  // If the user exists, update their details
  if (userIndex !== -1) {
    users[userIndex].title = title;
    users[userIndex].description = description;

    res.status(200).json({ user: users[userIndex] });
  } else {
    // If the user does not exist, return a 404 error
    res.status(404).json({ message: "User not found" });
  }
});

// Delete a user by ID
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  // Find the user with the matching ID in the users array
  const userIndex = users.findIndex((user) => user.id === id);

  // If the user exists, remove them from the array
  if (userIndex !== -1) {
    users.splice(userIndex, 1);

    res.status(200).json({ message: "User deleted" });
  } else {
    // If the user does not exist, return a 404 error
    res.status(404).json({ message: "User not found" });
  }
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

let tasks = [];
let idCounter = 1;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // So index.html works directly

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const task = { id: idCounter++, name: req.body.name };
  tasks.push(task);
  res.json(task);
});

app.put("/tasks/:id", (req, res) => {
  const id = +req.params.id;
  const task = tasks.find(t => t.id === id);
  if (task) task.name = req.body.name;
  res.json(task || {});
});

app.delete("/tasks/:id", (req, res) => {
  const id = +req.params.id;
  tasks = tasks.filter(t => t.id !== id);
  res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
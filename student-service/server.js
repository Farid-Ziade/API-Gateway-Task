import express from "express";

const app = express();

app.get("/students", (req, res) => {
  const students = [
    { id: 1, name: "John" },
    { id: 2, name: "Sarah" },
  ];

  res.json(students);
});

app.listen(3001, () => {
  console.log("Student Service running on port 3001");
});

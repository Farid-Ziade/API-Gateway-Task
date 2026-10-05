import express from "express";

const app = express();

app.get("/courses", (req, res) => {
  const courses = [
    { id: 1, name: "Node.js" },
    { id: 2, name: "React" },
  ];

  res.json(courses);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Course Service running on port ${PORT}`);
});

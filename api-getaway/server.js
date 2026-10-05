import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import rateLimit from "express-rate-limit";

const app = express();
const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: {
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

const studentProxy = createProxyMiddleware({
  target: "http://localhost:3001",
  changeOrigin: true,

  on: {
    error: (err, req, res) => {
      res.status(503).json({
        message: "Student Service is unavailable",
      });
    },
  },
});

const courseProxy = createProxyMiddleware({
  target: "http://localhost:3002",
  changeOrigin: true,

  on: {
    error: (err, req, res) => {
      res.status(503).json({
        message: "Course Service is unavailable",
      });
    },
  },
});

app.use("/students", (req, res, next) => {
  req.url = "/students" + req.url;
  studentProxy(req, res, next);
});

app.use("/courses", (req, res, next) => {
  req.url = "/courses" + req.url;
  courseProxy(req, res, next);
});

app.listen(3000, () => {
  console.log("API Gateway running on port 3000");
});

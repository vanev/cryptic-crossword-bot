import dotenv from "dotenv";
import express from "express";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("👋 hello");
});

app.listen(port, () => {
  console.log(`✳️ Application started. Listening on port ${port}.`);
});

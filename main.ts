import dotenv from "dotenv";
import express from "express";

dotenv.config();

const PORT = 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("👋 hello");
});

app.listen(PORT, () => {
  console.log(`✳️ Application started. Listening on port ${PORT}.`);
});

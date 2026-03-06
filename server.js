const express = require("express");
const Datastore = require("nedb");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const db = new Datastore({
  filename: "sessions.db",
  autoload: true
});

app.use("/final", express.static(path.join(__dirname, "public")));

app.get("/final", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/final/api/cat", (req, res) => {
  const imageUrl =
    "https://cataas.com/cat?width=300&height=300&t=" + Date.now();
  res.json({ image: imageUrl });
});

app.post("/final/api/session", (req, res) => {
  const session = req.body;
  session.createdAt = Date.now();

  db.insert(session, (err, newDoc) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(newDoc);
    }
  });
});

app.get("/final/api/session", (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(docs);
    }
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/final`);
});
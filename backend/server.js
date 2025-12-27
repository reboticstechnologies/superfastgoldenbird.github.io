
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  res.json({ message: "Upload successful", file: req.file.filename });
});

app.get("/files", (req, res) => {
  res.json(fs.readdirSync(uploadDir));
});

app.use("/uploads", express.static(uploadDir));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

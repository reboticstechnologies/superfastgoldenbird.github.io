
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "SUPER_SECRET_KEY";
const users = [];

/* REGISTER */
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email))
    return res.status(400).json({ msg: "User exists" });

  const hash = await bcrypt.hash(password, 10);
  users.push({ email, password: hash, plan: "FREE" });
  res.json({ msg: "Registered successfully" });
});

/* LOGIN */
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ msg: "Invalid login" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: "Invalid login" });

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
  res.json({ token, plan: user.plan });
});

/* AUTH MIDDLEWARE */
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

/* SUBSCRIBE */
app.post("/api/subscribe", auth, (req, res) => {
  const { plan } = req.body;
  const user = users.find(u => u.email === req.user.email);
  user.plan = plan;
  res.json({ msg: "Subscription updated", plan });
});

/* PROFILE */
app.get("/api/profile", auth, (req, res) => {
  const user = users.find(u => u.email === req.user.email);
  res.json({ email: user.email, plan: user.plan });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));

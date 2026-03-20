import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.send("API running");
});

app.post("/add", async (req, res) => {
  const user = new User({ name: req.body.name });
  await user.save();
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
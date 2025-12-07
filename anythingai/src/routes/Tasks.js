import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// CREATE TASK
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({
      userId: req.user,
      title: req.body.title,
      description: req.body.description,
      status: "pending"
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL TASKS
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user });
  res.json(tasks);
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE TASK
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

export default router;

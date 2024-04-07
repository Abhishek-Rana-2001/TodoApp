const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModel");
const Notification = require("../models/notificationModel");
const jwt = require("jsonwebtoken");
const verifyToken = require("../contollers/verificationController");
require("dotenv").config();

router.use(express.json());
router.post("/todo", verifyToken, async (req, res) => {

  try {
    const todo = await Todo.create({
      title: req.body.title,
      description: req.body.description,
      dueTime: new Date(req.body.dueTime),
      user: req.user.id,
    });

    if (req.body.date && req.body.time) {
      // Calculate the due datetime for the todo
      const dueDateTime = new Date(`${req.body.time}`);
      console.log(dueDateTime)

      // If the due datetime is in the future, create a notification for it
      if (dueDateTime > new Date()) {
        const notification = await Notification.create({
          todo: todo._id,
          title: "Todo Reminder",
          description: todo.description,
          sentAt: dueDateTime,
        });

        // Update the todo to include the reference to the notification
        todo.notifications.push(notification._id);
        await todo.save();
      }
    }
    res.json({
      title: todo.title,
      description: todo.description,
      dueTime:todo.dueTime,
      id: todo._id,
      completed:todo.completed
    });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
});

router.get("/todos", verifyToken, async (req, res) => {
  try {
    if (req.user) {
      const todos = await Todo.find({ user: req.user.id }).lean();
      const modifiedTodos = todos.map((todo) => {
        const { _id, ...rest } = todo;
        return { id: _id, ...rest };
      });
      res.json(modifiedTodos);
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.patch("/todo/:id", verifyToken, async (req, res) => {
  try {
    const updates = req.body;
    const { id } = req.params;
    if (updates) {
      const todo = await Todo.findByIdAndUpdate(id, updates, { new: true });
      if (!todo) return res.status(404).json({ msg: "No todo with this id" });
      res.status(200).send(todo);
    } else {
      res.send();
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.delete("/todo/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Todo.findOneAndDelete({ _id: id });
    if (deleted) {
      res.send({
        id: id,
        message: "Todo Deleted Successfully",
      });
    } else {
      res.status(404).send("Could not find the todo");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;

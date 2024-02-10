const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Todo = require("../models/todo");

mongoose.connect('mongodb+srv://Lida:oayjqe2005@cluster0.ejidejg.mongodb.net/todo?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
const todoFilePath = path.join(__dirname, "../data/todos.json");

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render("todos", { todos });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching todos" });
  }
});

router.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.redirect("/todos");
  } catch (error) {
    res.status(500).send({ success: false, message: "Error creating todo" });
  }
});

router.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todoToUpdate = await Todo.findById(id);

    if (todoToUpdate) {
      todoToUpdate.completed = !todoToUpdate.completed;
      await todoToUpdate.save();
      res.redirect("/todos");
    } else {
      res.status(404).send({ success: false, message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Error updating todo" });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.redirect("/todos");
  } catch (error) {
    res.status(500).send({ success: false, message: "Error deleting todo" });
  }
});

module.exports = router;


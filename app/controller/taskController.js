const Task = require("../model/task-model");
const User = require("../model/user-model");
const sendEmail = require("../../config/sendEmail");

const { validationResult } = require("express-validator");
const taskController = {};

taskController.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const body = req.body;
    body.userId = req.user.id;
    const task = await Task.create(req.body);
    if (task) {
      const userIds = task.assignedTo.map((ele) => {
        return ele.value;
      });
      console.log(userIds);
      sendEmail(userIds);
    }
    return res.status(201).json({ task });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: "something went wrong" });
  }
};

taskController.show = async (req, res) => {
  try {
    console.log(req.user.id);
    if (req.user.role == "Assigner") {
      const tasklist = await Task.find({ userId: req.user.id });
      return res.json(tasklist);
    } else if (req.user.role == "Assignee") {
      const tasklist = await Task.find({
        assignedTo: { $elemMatch: { value: req.user.id } },
      }).populate("userId", ["username", "email"]);
      return res.json(tasklist);
    }
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};

taskController.taskDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const taskDetails = await Task.findById(id);
    return res.json(taskDetails);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};

module.exports = taskController;

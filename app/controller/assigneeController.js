const { validationResult } = require("express-validator");
const Assignee = require("../model/assignee-model");
const assigneeController = {};

assigneeController.all = async (req, res) => {
  try {
    const assignees = await Assignee.find();
    return res.json(assignees);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};
assigneeController.show = async (req, res) => {
  try {
    const assignee = await Assignee.findOne({ userId: req.user.id });
    return res.json(assignee);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};
assigneeController.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const body = req.body;
    body.userId = req.user.id;
    const assignee = await Assignee.create(body);
    return res.status(201).json(assignee);
  } catch (err) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

assigneeController.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const assignee = await Assignee.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(assignee);
  } catch (err) {
    return res.status(500).json({ err, errors: "something went wrong" });
  }
};

module.exports = assigneeController;

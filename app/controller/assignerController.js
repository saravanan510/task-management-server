const Assigner = require("../model/assigner-model");
const { validationResult } = require("express-validator");
const assignerController = {};

assignerController.show = async (req, res) => {
  try {
    const assigner = await Assigner.findOne({ userId: req.user.id });
    return res.json(assigner);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong", err });
  }
};

assignerController.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const body = req.body;
    body.userId = req.user.id;
    const assigner = await Assigner.create(body);
    return res.status(201).json(assigner);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};

assignerController.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const assigner = await Assigner.findOneAndUpdate(
      { userId: req.user.id },
      req.body,
      { new: true }
    );
    return res.json(assigner);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};

module.exports = assignerController;

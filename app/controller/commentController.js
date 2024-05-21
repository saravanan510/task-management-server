const { validationResult } = require("express-validator");
const Comment = require("../model/comment-model");
const commentController = {};

commentController.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const body = req.body;
    body.userId = req.user.id;
    const comment = await Comment.create(body);
    return res.json(comment);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};

commentController.show = async (req, res) => {
  try {
    const comments = await Comment.find({ taskId: req.params.id });
    return res.json(comments);
  } catch (err) {
    return res.status(500).json({ errors: "something went wrong" });
  }
};

module.exports = commentController;

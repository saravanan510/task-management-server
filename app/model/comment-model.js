const mongoose = require("mongoose");
const User = require("./user-model");
const Task = require("./task-model");
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    comment: String,
    taskId: {
      type: Schema.Types.ObjectId,
      ref: Task,
    },
  },
  { timestamps: true }
);

const Comment = model("comment", commentSchema);

module.exports = Comment;

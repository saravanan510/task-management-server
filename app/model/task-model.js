const mongoose = require("mongoose");
const User = require("./user-model");
const { Schema, model } = mongoose;

const taskSchame = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User,
    },
    title: String,
    description: String,
    status: String,
    priority: String,
    dueDate: Date,
    assignedTo: [
      {
        value: { type: Schema.Types.ObjectId, ref: User },
        label: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Task = model("task", taskSchame);

module.exports = Task;

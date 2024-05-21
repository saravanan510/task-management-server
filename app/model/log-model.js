const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Task = require("./task-model");
const User = require("./user-model");

const logSchema = new Schema({
  startDate: String,
  startTime: String,
  endDate: String,
  endTime: String,
  taskId: {
    type: Schema.Types.ObjectId,
    ref: Task,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
});

const Log = model("log", logSchema);

module.exports = Log;

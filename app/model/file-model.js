const mongoose = require("mongoose");
const Task = require("./task-model");
const { Schema, model } = mongoose;

const fileSchema = new Schema({
  file: String,
  taskId: {
    type: Schema.Types.ObjectId,
    ref: Task,
  },
});

const File = model("file", fileSchema);

module.exports = File;

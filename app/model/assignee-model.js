const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const assigneeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    firstname: "String",
    lastname: "String",
    mobile: "Number",
    address: "String",
  },
  { timestamps: true }
);

const Assignee = model("assignee", assigneeSchema);

module.exports = Assignee;

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const assigerSchema = new Schema(
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

const Assigner = model("assigner", assigerSchema);

module.exports = Assigner;

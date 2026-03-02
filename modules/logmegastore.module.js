const mongoose = require("mongoose");

const logSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const log = mongoose.model("log", logSchema);

module.exports = log;

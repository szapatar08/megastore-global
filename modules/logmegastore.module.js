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

const log = mongoose.Model("log", logSchema);

module.exports = log;

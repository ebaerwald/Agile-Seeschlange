const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  description: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

//exports schema to modles
module.exports = mongoose.model("Tag", TagSchema);

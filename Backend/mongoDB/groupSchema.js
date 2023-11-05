const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: String,
  description: String,
  tags: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tag",
    },
  ],
  userIds: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  groupOwner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
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

module.exports = mongoose.model("Group", GroupSchema);

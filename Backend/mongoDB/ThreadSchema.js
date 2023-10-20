const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema({
  title: String,
  text: String,
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  score: Number,
  views: Number,
  closed: Boolean,
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  files: mongoose.Mixed,
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

// Export schema to models
module.exports = mongoose.model("Thread", ThreadSchema);

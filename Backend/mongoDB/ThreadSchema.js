const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema({
  title: String,
  text: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  score: Number,
  views: Number,
  closed: Boolean,
  image: String,
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

module.exports = mongoose.model("Thread", ThreadSchema);

const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  answerOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  text: String,
  parentThread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
  },
  parentAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
    },
  ],
  score: Number,
  IsMostHelpfull: Boolean,
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

//exports schema to modles
module.exports = mongoose.model("Answer", AnswerSchema);

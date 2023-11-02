const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  googleUserId: String,
  lastName: String,
  age: { type: Number, min: 0, max: 120 },
  dateOfBirth: Date,
  phoneNumber: String,
  email: { type: String, required: true, lowercase: true },
  street: String,
  country: String,
  password: String,
  houseNumber: Number,
  sex: String,
  profileImage: String,
  isActive: Boolean,
  favoriteThreads: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Thread",
    },
  ],
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
module.exports = mongoose.model("User", userSchema);

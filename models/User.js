import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

usersSchema.index({ email: 1 }, { unique: true });

const User = mongoose.models.User || mongoose.model("User", usersSchema);

module.exports = User;

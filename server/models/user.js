import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import crypto from "crypto";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salt: { type: String, required: true },
  hash: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

const User = mongoose.model("User", userSchema);

export default User;

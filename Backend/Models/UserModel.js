import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [5, "Name should be greater than 5 chars"],
    maxlength: [30, "Name should be less than 30 chars"],
    required: [true, "Enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please add email"],
    unique: true,
  },
  number: {
    type: String,  
    required: [true, "Enter a mobile number"],
    unique: true,
    minlength: [10, "Must be 10 digits"],
    maxlength: [10, "Must be 10 digits"],
  },
  password: {
    type: String,
    required: [true, "Enter the password"],
  },
});

// 🔑 Compare password
UserSchema.methods.comparePassword = async function (userpassword) {
  return bcrypt.compare(userpassword, this.password);
};

// 🔒 Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const usermodel = mongoose.model("usermodel", UserSchema);
export default usermodel;

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
      },
    ],

    genderPreference: {
      type: String,
      enum: ["male", "female", "unisex"],
      default: "unisex",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;

import mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema(
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
 
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Owner = mongoose.model("Owner", OwnerSchema);
export default Owner;
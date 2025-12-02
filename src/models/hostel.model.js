import mongoose from "mongoose";

const HostelSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },

    hostelName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },

    images: {
      type: String, // array of Google Drive URLs
      validate: {
        validator: function (url) {
          return /^https:\/\/drive\.google\.com/.test(url);
        },
        message: "Images must be a valid Google Drive link",
      },
    },

    totalSlots: {
      type: Number,
      required: true,
      min: 1,
    },

    availableSlots: {
      type: Number,
      required: true,
      min: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Hostel = mongoose.model("Hostel", HostelSchema);
export default Hostel;
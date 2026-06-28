import mongoose from "mongoose";

const EmergencyRequestSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    customerName: String,

    serviceType: String,

    description: String,

    location: {
      lat: Number,
      lng: Number,
    },
customerEmail: {
  type: String,
  required: true,
},
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed"],
      default: "Pending",
    },

    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.EmergencyRequest ||
  mongoose.model(
    "EmergencyRequest",
    EmergencyRequestSchema
  );
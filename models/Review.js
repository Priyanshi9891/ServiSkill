import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
    },

   rating: {
  type: Number,
  required: true,
  min: 1,
  max: 5,
},

    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Review ||
  mongoose.model("Review", ReviewSchema);
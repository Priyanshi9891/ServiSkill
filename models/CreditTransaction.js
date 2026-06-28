import mongoose from "mongoose";

const CreditTransactionSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      type: {
        type: String,
        enum: ["Earned", "Spent"],
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      reason: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models.CreditTransaction ||
  mongoose.model(
    "CreditTransaction",
    CreditTransactionSchema
  );
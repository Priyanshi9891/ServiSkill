
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
   
    customerName: {
      type: String,
      required: true,
    },

    customerEmail: {
      type: String,
      required: true,
    },
     customerId: {
  type: String,
  required: true,
},

    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
      required: true,
    },

    providerName: {
      type: String,
      required: true,
    },

    providerEmail: {
  type: String,
  required: true,
},

    service: {
  type: String,
  required: function () {
    return this.serviceType === "Professional";
  },
},
paymentStatus: {
  type: String,
  default: "paid_demo",
},
bookingDate: {
  type: String,
  required: function () {
    return this.serviceType === "Professional";
  },
},
    serviceType: {
  type: String,
  enum: ["Professional", "Skill Teaching"],
  default: "Professional",
},

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed"],
      default: "Pending",
    },
  },
  
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
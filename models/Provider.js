

import mongoose from "mongoose";

const ProviderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    email: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    skill: {
      type: String,
      required: true,
    },

    // SERVICE TYPE
    serviceType: {
      type: String,
      enum: ["Professional", "Skill Teaching"],
      default: "Professional",
    },

    // PROFESSIONAL SERVICE FIELDS
    experience: {
      type: Number,
      default: 0,
    },

    pricing: {
      type: Number,
      default: 0,
    },

    location: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    // SKILL TEACHING FIELDS
    creditsRequired: {
      type: Number,
      default: 0,
    },

    level: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    // COMMON FIELDS
    rating: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    latitude: {
      type: Number,
      default: 0,
    },

    longitude: {
      type: Number,
      default: 0,
    },

    geoLocation: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
  },

  coordinates: {
    type: [Number],
    default: [0, 0],
  },
},

  },
  {
    timestamps: true,
  }
);
ProviderSchema.index({
  geoLocation: "2dsphere",
});

export default mongoose.models.Provider ||
  mongoose.model("Provider", ProviderSchema);
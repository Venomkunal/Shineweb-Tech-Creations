import mongoose, { Schema } from "mongoose";

const offerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    highlight: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    eyebrow: {
      type: String,
      default: "BUSINESS SOLUTIONS",
      trim: true,
      maxlength: 80,
    },
    features: {
      type: [String],
      default: [],
      validate: {
        validator: (items: string[]) =>
          items.length <= 8 &&
          items.every((item) => item.trim().length > 0),
        message: "Provide up to 8 non-empty features.",
      },
    },
    buttonText: {
      type: String,
      default: "Learn more",
      trim: true,
      maxlength: 60,
    },
    buttonLink: {
      type: String,
      default: "/contact",
      trim: true,
      maxlength: 300,
    },
    footnote: {
      type: String,
      default: "",
      trim: true,
      maxlength: 200,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    priority: {
      type: Number,
      default: 0,
      min: 0,
      max: 9999,
    },
  },
  { timestamps: true }
);

offerSchema.index({ active: 1, priority: -1, createdAt: -1 });

const Offer =
  mongoose.models.Offer ||
  mongoose.model("Offer", offerSchema);

export default Offer;
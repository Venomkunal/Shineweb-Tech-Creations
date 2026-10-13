
import mongoose, { Schema, type InferSchemaType } from "mongoose";

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
    logoUrl: {
      type: String,
      trim: true,
      default: "",
    },
    websiteUrl: {
      type: String,
      trim: true,
      default: "",
    },
    sortOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
    featured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

partnerSchema.index({ status: 1, sortOrder: 1 });

export type PartnerDocument = InferSchemaType<typeof partnerSchema>;

const Partner =
  mongoose.models.Partner ||
  mongoose.model("Partner", partnerSchema);

export default Partner;

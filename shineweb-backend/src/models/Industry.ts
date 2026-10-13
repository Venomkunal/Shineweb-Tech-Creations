
import mongoose, { Schema, type InferSchemaType } from "mongoose";

const industrySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      default: "01",
    },
    href: {
      type: String,
      default: "/solutions",
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export type IndustryDocument = InferSchemaType<
  typeof industrySchema
>;

const Industry =
  mongoose.models.Industry ||
  mongoose.model("Industry", industrySchema);

export default Industry;

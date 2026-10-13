
import mongoose, { Schema, model, models } from "mongoose";

export interface ITestimonial {
  name: string;
  role: string;
  company: string;
  category: string;
  text: string;
  rating: number;
  avatarUrl: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    role: {
      type: String,
      trim: true,
      default: "",
      maxlength: 100,
    },
    company: {
      type: String,
      trim: true,
      default: "",
      maxlength: 150,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: "",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

testimonialSchema.index({ isPublished: 1, sortOrder: 1 });

const Testimonial =
  models.Testimonial ??
  model<ITestimonial>("Testimonial", testimonialSchema);

export default Testimonial;

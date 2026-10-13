
import { Schema, model, models, type Model } from "mongoose";

export type BlogStatus = "draft" | "published";

export interface IBlog {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  imageAlt: string;
  author: string;
  tags: string[];
  status: BlogStatus;
  featured: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 200,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 400,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
      trim: true,
    },
    imageAlt: {
      type: String,
      default: "",
      trim: true,
      maxlength: 250,
    },
    author: {
      type: String,
      default: "Shineweb Tech Creations",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: undefined,
    },
  },
  { timestamps: true }
);

blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, status: 1 });

const Blog =
  (models.Blog as Model<IBlog> | undefined) ||
  model<IBlog>("Blog", blogSchema);

export default Blog;

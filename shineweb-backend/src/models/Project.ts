
import mongoose, { Schema, type Document, type Model } from "mongoose";

export type ProjectCategory =
  | "Web Development"
  | "Business Software"
  | "IT Infrastructure";

export interface IProject extends Document {
  title: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  image: string;
  tags: string[];
  visual: "hospital" | "bakery" | "commerce" | "network";
  number: string;
  href: string;
  liveUrl?: string;
  featured: boolean;
  sortOrder: number;
  status: "draft" | "published";
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
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
      enum: [
        "Web Development",
        "Business Software",
        "IT Infrastructure",
      ],
      required: true,
    },
    categoryLabel: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    visual: {
      type: String,
      enum: ["hospital", "bakery", "commerce", "network"],
      default: "commerce",
    },
    number: {
      type: String,
      default: "01",
    },
    href: {
      type: String,
      default: "/projects",
    },
    liveUrl: {
      type: String,
      default: "",
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProjectSchema.index({ status: 1, featured: 1, sortOrder: 1 });

const Project: Model<IProject> =
  (mongoose.models.Project as Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);

export default Project;

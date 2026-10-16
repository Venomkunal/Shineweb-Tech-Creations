
import mongoose, { Schema, type InferSchemaType } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 280,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    coverImage: {
      type: String,
      default: null,
      trim: true,
    },

    imageAlt: {
      type: String,
      default: "",
      trim: true,
      maxlength: 250,
    },

    authorName: {
      type: String,
      default: "Shineweb Tech Creations",
      trim: true,
      maxlength: 150,
    },

    readingTime: {
      type: Number,
      default: 5,
      min: 1,
      max: 180,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: null,
    },

    tags: {
      type: [
        {
          type: String,
          trim: true,
          maxlength: 50,
        },
      ],
      default: [],
      validate: {
        validator: (tags: string[]) => tags.length <= 20,
        message: "A maximum of 20 tags is allowed",
      },
    },

    seo: {
      metaTitle: {
        type: String,
        default: "",
        trim: true,
        maxlength: 70,
      },
      metaDescription: {
        type: String,
        default: "",
        trim: true,
        maxlength: 170,
      },
      canonicalUrl: {
        type: String,
        default: "",
        trim: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  }
);

blogSchema.index({
  status: 1,
  publishedAt: -1,
});

blogSchema.index({
  category: 1,
  status: 1,
  publishedAt: -1,
});

blogSchema.index({
  isFeatured: -1,
  publishedAt: -1,
});

export type BlogDocument = InferSchemaType<typeof blogSchema>;

const Blog =
  mongoose.models.Blog ||
  mongoose.model("Blog", blogSchema);

export default Blog;

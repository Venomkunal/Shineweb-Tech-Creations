"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, status: 1 });
const Blog = mongoose_1.models.Blog ||
    (0, mongoose_1.model)("Blog", blogSchema);
exports.default = Blog;

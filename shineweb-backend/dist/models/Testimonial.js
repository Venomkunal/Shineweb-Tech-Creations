"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const testimonialSchema = new mongoose_1.Schema({
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
}, { timestamps: true });
testimonialSchema.index({ isPublished: 1, sortOrder: 1 });
const Testimonial = mongoose_1.models.Testimonial ??
    (0, mongoose_1.model)("Testimonial", testimonialSchema);
exports.default = Testimonial;

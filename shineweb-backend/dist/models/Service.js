"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true, maxlength: 120 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true, maxlength: 300 },
    description: { type: String, default: '', maxlength: 10000 },
    icon: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
}, { timestamps: true });
serviceSchema.index({ published: 1, sortOrder: 1 });
exports.default = (0, mongoose_1.model)('Service', serviceSchema);

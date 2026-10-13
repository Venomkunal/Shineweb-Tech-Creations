import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
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
export default model('Service', serviceSchema);

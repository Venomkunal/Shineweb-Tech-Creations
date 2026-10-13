import { Schema, model } from 'mongoose';

const enquirySchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, trim: true, maxlength: 30 },
  company: { type: String, trim: true, maxlength: 150 },
  service: { type: String, trim: true, maxlength: 120 },
  subject: { type: String, trim: true, maxlength: 200 },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  budget: { type: String, trim: true, maxlength: 80 },
  timeline: { type: String, trim: true, maxlength: 80 },
  source: { type: String, enum: ['contact', 'quotation'], default: 'contact' },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'won', 'lost'], default: 'new' },
  adminNotes: { type: String, maxlength: 5000 }
}, { timestamps: true });

enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ email: 1 });
export default model('Enquiry', enquirySchema);

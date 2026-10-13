import { Router } from 'express';
import { z } from 'zod';
import Enquiry from '../models/Enquiry';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(150).optional(),
  service: z.string().trim().max(120).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(10).max(5000),
  budget: z.string().trim().max(80).optional(),
  timeline: z.string().trim().max(80).optional(),
  source: z.enum(['contact', 'quotation']).optional()
});

// Public website form: create an enquiry.
router.post('/', asyncHandler(async (req, res) => {
  const parsed = enquirySchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ success: false, message: 'Please check the form fields', errors: parsed.error.flatten().fieldErrors }); return; }
  const enquiry = await Enquiry.create(parsed.data);
  res.status(201).json({ success: true, message: 'Thank you. Your enquiry has been received.', data: { id: enquiry.id } });
}));

// Admin-only lead management.
router.get('/', requireAuth, requireAdmin, asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
  const status = typeof req.query.status === 'string' ? req.query.status : undefined;
  const filter = status && ['new', 'contacted', 'qualified', 'won', 'lost'].includes(status) ? { status } : {};
  const [items, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Enquiry.countDocuments(filter)
  ]);
  res.json({ success: true, data: items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}));

router.patch('/:id', requireAuth, requireAdmin, asyncHandler(async (req, res) => {
  const schema = z.object({ status: z.enum(['new', 'contacted', 'qualified', 'won', 'lost']).optional(), adminNotes: z.string().max(5000).optional() }).refine(v => Object.keys(v).length > 0);
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ success: false, message: 'Provide a valid status or adminNotes value' }); return; }
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
  if (!enquiry) { res.status(404).json({ success: false, message: 'Enquiry not found' }); return; }
  res.json({ success: true, data: enquiry });
}));

export default router;

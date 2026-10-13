import { Router } from 'express';
import { z } from 'zod';
import Service from '../models/Service';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const serviceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(140),
  summary: z.string().trim().min(5).max(300),
  description: z.string().max(10000).optional(),
  icon: z.string().max(100).optional(),
  imageUrl: z.string().max(1000).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(10000).optional()
});

router.get('/', asyncHandler(async (_req, res) => {
  const items = await Service.find({ published: true }).sort({ sortOrder: 1, createdAt: -1 });
  res.json({ success: true, data: items });
}));

router.get('/admin/all', requireAuth, requireAdmin, asyncHandler(async (_req, res) => {
  const items = await Service.find().sort({ sortOrder: 1, createdAt: -1 });
  res.json({ success: true, data: items });
}));

router.post('/', requireAuth, requireAdmin, asyncHandler(async (req, res) => {
  const parsed = serviceSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ success: false, message: 'Invalid service fields', errors: parsed.error.flatten().fieldErrors }); return; }
  const item = await Service.create(parsed.data);
  res.status(201).json({ success: true, data: item });
}));

router.patch('/:id', requireAuth, requireAdmin, asyncHandler(async (req, res) => {
  const parsed = serviceSchema.partial().safeParse(req.body);
  if (!parsed.success || !Object.keys(parsed.data ?? {}).length) { res.status(400).json({ success: false, message: 'Provide valid service fields' }); return; }
  const item = await Service.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
  if (!item) { res.status(404).json({ success: false, message: 'Service not found' }); return; }
  res.json({ success: true, data: item });
}));

router.delete('/:id', requireAuth, requireAdmin, asyncHandler(async (req, res) => {
  const item = await Service.findByIdAndDelete(req.params.id);
  if (!item) { res.status(404).json({ success: false, message: 'Service not found' }); return; }
  res.json({ success: true, message: 'Service deleted' });
}));

export default router;

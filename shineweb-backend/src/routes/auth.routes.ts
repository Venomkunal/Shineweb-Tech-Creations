import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import User from '../models/User';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();
const loginSchema = z.object({ email: z.string().email().max(254), password: z.string().min(1).max(200) });

router.post('/login', asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ success: false, message: 'Enter a valid email and password' }); return; }
  const email = parsed.data.email.toLowerCase();
  const user = await User.findOne({ email, active: true }).select('+passwordHash');
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    res.status(401).json({ success: false, message: 'Invalid email or password' }); return;
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET missing');
  const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: (process.env.JWT_EXPIRES_IN || '1d') as jwt.SignOptions['expiresIn'] });
  res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } } });
}));

export default router;

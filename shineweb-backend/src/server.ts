import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import { connectDatabase } from './config/db';
import User from './models/User';
import authRoutes from './routes/auth.routes';
import enquiryRoutes from './routes/enquiry.routes';
import serviceRoutes from './routes/service.routes';
import productRoutes from "./routes/productRoutes";
import offerRoutes from "./routes/offerRoutes";
import IndustryRoutes from "./routes/industryRoutes";
import projectRoutes from "./routes/projectRoutes";
import testimonialRoutes from "./routes/testimonialRoutes";
import blogRoutes from "./routes/blogRoutes";
import partnerRoutes from "./routes/partnerRoutes";
import { notFound, errorHandler } from './middleware/errorHandler';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: (process.env.FRONTEND_URL || 'http://localhost:3000').split(',').map(s => s.trim()), methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get('/api/health', (_req, res) => res.json({ success: true, service: 'Shineweb Tech Creations API', status: 'healthy', timestamp: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/services', serviceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/industries", require("./routes/industryRoutes").default);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/partners", partnerRoutes);
app.use(notFound);
app.use(errorHandler);

async function start(): Promise<void> {
  await connectDatabase();
  // Bootstrap the first admin only when the configured email does not already exist.
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (name && email && password && password !== 'change-this-before-first-run') {
    const existing = await User.findOne({ email });
    if (!existing) {
      const passwordHash = await bcrypt.hash(password, 12);
      await User.create({ name, email, passwordHash, role: 'admin' });
      console.log(`Initial admin created for ${email}`);
    }
  }
  const port = Number(process.env.PORT) || 5000;
  app.listen(port, () => console.log(`Shineweb API listening on port ${port}`));
}

start().catch(error => { console.error('Failed to start API:', error); process.exit(1); });

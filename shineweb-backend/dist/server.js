"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("./config/db");
const User_1 = __importDefault(require("./models/User"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const enquiry_routes_1 = __importDefault(require("./routes/enquiry.routes"));
const service_routes_1 = __importDefault(require("./routes/service.routes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const offerRoutes_1 = __importDefault(require("./routes/offerRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const testimonialRoutes_1 = __importDefault(require("./routes/testimonialRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const partnerRoutes_1 = __importDefault(require("./routes/partnerRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.disable('x-powered-by');
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: (process.env.FRONTEND_URL || 'http://localhost:3000').split(',').map(s => s.trim()), methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express_1.default.json({ limit: '1mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '1mb' }));
app.use('/api', (0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: 'draft-7', legacyHeaders: false }));
app.use('/api/auth', (0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: 'draft-7', legacyHeaders: false }));
app.get('/api/health', (_req, res) => res.json({ success: true, service: 'Shineweb Tech Creations API', status: 'healthy', timestamp: new Date().toISOString() }));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/enquiries', enquiry_routes_1.default);
app.use('/api/services', service_routes_1.default);
app.use("/api/products", productRoutes_1.default);
app.use("/api/offers", offerRoutes_1.default);
app.use("/api/industries", require("./routes/industryRoutes").default);
app.use("/api/projects", projectRoutes_1.default);
app.use("/api/testimonials", testimonialRoutes_1.default);
app.use("/api/blogs", blogRoutes_1.default);
app.use("/api/partners", partnerRoutes_1.default);
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
async function start() {
    await (0, db_1.connectDatabase)();
    // Bootstrap the first admin only when the configured email does not already exist.
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL?.toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    if (name && email && password && password !== 'change-this-before-first-run') {
        const existing = await User_1.default.findOne({ email });
        if (!existing) {
            const passwordHash = await bcryptjs_1.default.hash(password, 12);
            await User_1.default.create({ name, email, passwordHash, role: 'admin' });
            console.log(`Initial admin created for ${email}`);
        }
    }
    const port = Number(process.env.PORT) || 5000;
    app.listen(port, () => console.log(`Shineweb API listening on port ${port}`));
}
start().catch(error => { console.error('Failed to start API:', error); process.exit(1); });

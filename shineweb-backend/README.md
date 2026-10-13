# Shineweb Tech Creations Backend

REST API starter for the Shineweb Tech Creations Next.js website.

## Requirements
- Node.js 20+
- MongoDB local instance or MongoDB Atlas

## Setup
1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI`, a long random `JWT_SECRET`, `FRONTEND_URL`, and a strong `ADMIN_PASSWORD`.
3. Never commit `.env` or deploy with the example credentials.
4. Install and run:

```bash
npm install
npm run dev
```

Build and run production:

```bash
npm run build
npm start
```

## Endpoints
- `GET /api/health` — health check
- `POST /api/auth/login` — admin/editor login; returns bearer JWT
- `POST /api/enquiries` — public contact/quotation form
- `GET /api/enquiries?page=1&limit=20&status=new` — admin list (JWT)
- `PATCH /api/enquiries/:id` — admin update status/notes (JWT)
- `GET /api/services` — published services
- `GET /api/services/admin/all` — all services including drafts (admin JWT)
- `POST /api/services` — create service (admin JWT)
- `PATCH /api/services/:id` — update service (admin JWT)
- `DELETE /api/services/:id` — delete service (admin JWT)

## Example enquiry payload
```json
{
  "name": "A Customer",
  "email": "customer@example.com",
  "phone": "+91XXXXXXXXXX",
  "service": "Website Development",
  "message": "I need a business website for my company.",
  "source": "quotation",
  "budget": "₹25,000–₹50,000",
  "timeline": "Within one month"
}
```

## Frontend integration
Set `NEXT_PUBLIC_API_URL=http://localhost:5000/api` in the Next.js frontend. Submit forms to `${process.env.NEXT_PUBLIC_API_URL}/enquiries` with JSON. Keep admin tokens out of URLs and never expose server-only secrets with `NEXT_PUBLIC_` variables.

## Production checklist
- Use HTTPS and a managed MongoDB deployment with backups.
- Replace secrets and restrict CORS to the exact production origin.
- Add email notifications, CAPTCHA/anti-spam, audit logs, password reset, and stronger admin session management before public launch.


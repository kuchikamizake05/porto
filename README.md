# Portfolio Website

Modern portfolio website built with Next.js and deployed on Vercel.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Database:** Supabase Postgres
- **ORM:** Prisma
- **Language:** TypeScript

## 📦 Quick Start

```bash
cd fe
npm install
npm run dev
```

Visit `http://localhost:3000`

## 🔧 Environment Variables

Create `.env` in the `fe/` directory:

```env
DATABASE_URL="postgresql://postgres.[project-ref]:[password]@[pooler-host]:6543/postgres"
DIRECT_URL="postgresql://postgres.[project-ref]:[password]@[pooler-host]:5432/postgres"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="scrypt:..."
JWT_SECRET="your-random-secret"
```

Use the connection string from Supabase Project Settings > Database.

## 📝 API Routes

All API routes are serverless functions in `fe/app/api/`:

- `GET /api/health` - Health check
- `GET /api/projects` - Get all projects
- `GET /api/experiences` - Get work experiences
- `GET /api/education` - Get education history
- `POST /api/contact` - Submit contact form

## 🌐 Deployment

Deployed on **Vercel** with automatic deployments from GitHub.

**Environment variables needed:**
- `DATABASE_URL`
- `DIRECT_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`
- `JWT_SECRET`

## 👤 Author

**Faaid Sakhaa**
- Information Engineering Student
- GitHub: [@kuchikamizake05](https://github.com/kuchikamizake05)

## 📄 License

MIT License

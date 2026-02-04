# Portfolio Website

Portfolio website built with Next.js (frontend) and Express.js (backend).

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript

### Backend
- **Framework:** Express.js
- **Database:** SQLite with Prisma ORM
- **Language:** TypeScript
- **CORS:** Enabled for cross-origin requests

## 📦 Project Structure

```
porto/
├── fe/          # Frontend (Next.js)
├── be/          # Backend (Express.js)
└── README.md
```

## 🛠️ Local Development

### Prerequisites
- Node.js 20+ 
- npm or yarn

### Frontend Setup

```bash
cd fe
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### Backend Setup

```bash
cd be
npm install
npm run dev
```

Backend will run on `http://localhost:8000`

### Environment Variables

Create a `.env` file in the `be` directory:

```env
DATABASE_URL="file:./dev.db"
```

## 🚀 Production Build

### Frontend
```bash
cd fe
npm run build
npm start
```

### Backend
```bash
cd be
npm run build
npm start
```

## 📝 API Endpoints

- `GET /` - Health check
- `GET /profile` - Get profile information
- `GET /projects` - Get all projects
- `GET /experiences` - Get work experiences
- `POST /contact` - Submit contact form

## 🌐 Deployment

### Recommended Platforms

**Frontend (Next.js):**
- Vercel (recommended)
- Netlify
- Railway

**Backend (Express):**
- Railway
- Render
- Fly.io
- Heroku

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `DATABASE_URL` - Production database URL
- `NODE_ENV=production`
- `PORT` - Backend port (usually auto-assigned)

## 👤 Author

**Faaid Sakhaa**
- Information Engineering Student
- GitHub: [@kuchikamizake05](https://github.com/kuchikamizake05)

## 📄 License

This project is open source and available under the MIT License.

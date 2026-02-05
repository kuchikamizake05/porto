# 🚀 Deployment Guide

Panduan lengkap untuk deploy portfolio website ke production.

## Platform yang Direkomendasikan

### Frontend (Next.js) → Vercel
### Backend (Express) → Railway

---

## 📦 Deploy Frontend ke Vercel

### Step 1: Persiapan
1. Push code ke GitHub (sudah ✅)
2. Buat akun di [Vercel](https://vercel.com)

### Step 2: Import Project
1. Login ke Vercel
2. Click **"Add New Project"**
3. Import repository: `kuchikamizake05/porto`
4. **Root Directory**: pilih `fe`
5. Framework Preset: Next.js (auto-detect)

### Step 3: Environment Variables
Tambahkan environment variable di Vercel:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

⚠️ **PENTING**: Ganti `your-backend-url` dengan URL backend Railway kamu (lihat step backend)

### Step 4: Deploy
1. Click **"Deploy"**
2. Tunggu build selesai (~2-3 menit)
3. Vercel akan memberikan URL: `https://porto-username.vercel.app`

---

## 🚂 Deploy Backend ke Railway

### Step 1: Persiapan
1. Buat akun di [Railway](https://railway.app)
2. Install Railway CLI (optional):
   ```bash
   npm install -g @railway/cli
   ```

### Step 2: Create New Project
1. Login ke Railway
2. Click **"New Project"**
3. Pilih **"Deploy from GitHub repo"**
4. Pilih repository: `kuchikamizake05/porto`

### Step 3: Configure Service
1. **Root Directory**: `be`
2. **Build Command**: `npm install && npm run build`
3. **Start Command**: `npm start`

### Step 4: Environment Variables
Tambahkan di Railway Settings → Variables:

```
DATABASE_URL=file:./dev.db
NODE_ENV=production
PORT=${{RAILWAY_PORT}}
```

### Step 5: Generate Domain
1. Go to **Settings** → **Networking**
2. Click **"Generate Domain"**
3. Copy URL (contoh: `https://porto-production.up.railway.app`)

### Step 6: Update Frontend
Kembali ke Vercel:
1. Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL` dengan Railway URL
3. Redeploy frontend

---

## 🔄 Alternative: Deploy Keduanya ke Vercel

Jika mau deploy backend juga ke Vercel:

### Backend di Vercel
1. Create new project di Vercel
2. Root directory: `be`
3. Framework: Other
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Install Command: `npm install`

⚠️ **Note**: Vercel Serverless Functions punya limitation untuk Express apps. Railway lebih recommended untuk backend.

---

## 🗄️ Database Production

### Option 1: SQLite (Simple, untuk portfolio)
- Tetap pakai SQLite
- File `dev.db` akan di-generate otomatis
- ✅ Gratis, mudah
- ⚠️ Data hilang saat redeploy

### Option 2: PostgreSQL (Recommended untuk production)

#### Setup di Railway:
1. Di Railway project, click **"New"** → **"Database"** → **"PostgreSQL"**
2. Copy `DATABASE_URL` dari Variables
3. Update `.env` dan Railway environment variables

#### Update Prisma Schema:
```prisma
datasource db {
  provider = "postgresql"  // ganti dari sqlite
  url      = env("DATABASE_URL")
}
```

#### Migrate Database:
```bash
npx prisma migrate deploy
npx prisma generate
```

---

## ✅ Checklist Deployment

### Pre-deployment:
- [x] Code pushed to GitHub
- [x] Build scripts configured
- [x] Environment variables documented
- [x] README.md created
- [ ] Test production build locally
- [ ] Update CORS origins for production

### Post-deployment:
- [ ] Test all pages
- [ ] Test API endpoints
- [ ] Check mobile responsiveness
- [ ] Test contact form
- [ ] Monitor error logs

---

## 🔧 Troubleshooting

### Frontend tidak bisa connect ke Backend
- ✅ Pastikan `NEXT_PUBLIC_API_URL` sudah di-set di Vercel
- ✅ Pastikan backend CORS mengizinkan frontend domain
- ✅ Check backend logs di Railway

### Build Failed
- ✅ Check build logs
- ✅ Pastikan semua dependencies ada di `package.json`
- ✅ Test `npm run build` locally

### Database Error
- ✅ Check `DATABASE_URL` environment variable
- ✅ Run `npx prisma generate` setelah deploy
- ✅ Check database connection di Railway logs

---

## 📊 Monitoring

### Vercel
- Dashboard → Analytics
- Real-time logs
- Performance metrics

### Railway
- Dashboard → Deployments
- Logs tab untuk error tracking
- Metrics untuk CPU/Memory usage

---

## 💰 Pricing

### Vercel (Frontend)
- **Hobby Plan**: FREE
  - Unlimited deployments
  - Automatic HTTPS
  - 100GB bandwidth/month

### Railway (Backend)
- **Free Trial**: $5 credit
- **Developer Plan**: $5/month
  - Includes $5 usage credit
  - Pay for what you use

---

## 🎉 Selesai!

Setelah deploy, website kamu akan live di:
- Frontend: `https://porto-username.vercel.app`
- Backend: `https://porto-production.up.railway.app`

Jangan lupa update README.md dengan live URL! 🚀

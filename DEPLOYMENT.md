# 🚀 Deployment Guide - HLS Tech

Complete guide for deploying the HLS Tech website to production.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] Email service configured (Gmail App Password or SMTP)
- [ ] Domain name registered (optional)
- [ ] SSL certificate ready (automatic with most hosts)
- [ ] Environment variables documented
- [ ] Admin credentials changed from defaults

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (Free tier available)
4. Choose your cloud provider and region (closest to your users)
5. Wait for cluster creation (2-5 minutes)

### 2. Configure Database Access

1. Go to **Database Access**
2. Click **Add New Database User**
3. Create username and strong password
4. Set permissions to **Read and write to any database**
5. Save credentials securely

### 3. Configure Network Access

1. Go to **Network Access**
2. Click **Add IP Address**
3. For development: Add your current IP
4. For production: Click **Allow Access from Anywhere** (0.0.0.0/0)
   - Note: This is safe as authentication is still required

### 4. Get Connection String

1. Click **Connect** on your cluster
2. Choose **Connect your application**
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `myFirstDatabase` with `hls-tech`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hls-tech?retryWrites=true&w=majority
```

## 🖥️ Backend Deployment (Render)

### 1. Prepare Backend

1. Ensure `package.json` has start script:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

2. Create `.gitignore` if not exists:
```
node_modules/
.env
```

### 2. Deploy to Render

1. Go to [Render](https://render.com)
2. Sign up with GitHub
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Name**: hls-tech-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

### 3. Set Environment Variables

In Render dashboard, add:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hls-tech
JWT_SECRET=your_very_secure_random_string_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@hlstech.co.zm
FRONTEND_URL=https://your-frontend-url.vercel.app
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!
```

### 4. Deploy

1. Click **Create Web Service**
2. Wait for deployment (5-10 minutes)
3. Note your backend URL: `https://hls-tech-api.onrender.com`

### 5. Seed Database

After first deployment:
```bash
# SSH into Render or use local terminal
npm run seed
```

Or create a one-time job in Render to run the seed script.

## 🌐 Frontend Deployment (Vercel)

### 1. Prepare Frontend

1. Update `frontend/.env.production`:
```env
VITE_API_URL=https://hls-tech-api.onrender.com/api
```

2. Test build locally:
```bash
cd frontend
npm run build
npm run preview
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click **Add New Project**
4. Import your repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist

### 3. Set Environment Variables

In Vercel project settings:
```
VITE_API_URL=https://hls-tech-api.onrender.com/api
```

### 4. Deploy

1. Click **Deploy**
2. Wait for deployment (2-5 minutes)
3. Your site will be live at: `https://your-project.vercel.app`

## 🔧 Alternative Hosting Options

### Backend Alternatives

#### Railway
1. Similar to Render
2. Go to [Railway](https://railway.app)
3. Connect GitHub repo
4. Add MongoDB Atlas connection
5. Set environment variables
6. Deploy

#### AWS EC2
1. Launch Ubuntu instance
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Use PM2 for process management
6. Configure Nginx as reverse proxy

### Frontend Alternatives

#### Netlify
1. Go to [Netlify](https://netlify.com)
2. Connect GitHub repo
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Set environment variables
5. Deploy

## 🌍 Custom Domain Setup

### For Vercel (Frontend)

1. Go to **Project Settings** → **Domains**
2. Add your domain: `hlstech.co.zm`
3. Follow DNS configuration instructions
4. Add DNS records at your domain registrar:
   - Type: A
   - Name: @
   - Value: 76.76.21.21 (Vercel's IP)
   
   Or CNAME:
   - Name: www
   - Value: cname.vercel-dns.com

### For Render (Backend)

1. Go to **Settings** → **Custom Domains**
2. Add: `api.hlstech.co.zm`
3. Add CNAME record:
   - Name: api
   - Value: your-service.onrender.com

## 📧 Email Service Setup

### Gmail Setup

1. Enable 2-Factor Authentication on Gmail
2. Go to **Google Account** → **Security**
3. Click **App passwords**
4. Generate password for "Mail"
5. Use this password in `EMAIL_PASS` environment variable

### Alternative: SendGrid

1. Sign up at [SendGrid](https://sendgrid.com)
2. Create API key
3. Update email configuration:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your_sendgrid_api_key
```

## 🔒 Security Hardening

### 1. Update Admin Password

After first deployment, log in and change the default admin password.

### 2. JWT Secret

Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. CORS Configuration

Update `backend/server.js` to only allow your frontend domain:
```javascript
app.use(cors({
  origin: 'https://hlstech.co.zm',
  credentials: true
}));
```

### 4. Rate Limiting

Already configured in the backend. Adjust if needed in `server.js`.

## 📊 Monitoring & Analytics

### 1. Add Google Analytics

In `frontend/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Backend Monitoring

Consider using:
- **Render Metrics** (built-in)
- **New Relic**
- **DataDog**
- **Sentry** for error tracking

## 🔄 CI/CD Setup

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
```

## 🧪 Post-Deployment Testing

1. **Test all public pages**:
   - Home, About, Services, Projects, Blog, Contact

2. **Test admin functionality**:
   - Login
   - Create/Edit/Delete content
   - View analytics

3. **Test forms**:
   - Contact form submission
   - Newsletter subscription
   - Email notifications

4. **Test responsiveness**:
   - Mobile devices
   - Tablets
   - Desktop

5. **SEO Check**:
   - Use Google Search Console
   - Check meta tags
   - Verify sitemap

## 🆘 Troubleshooting

### Backend Issues

**Problem**: Cannot connect to MongoDB
- Check connection string
- Verify IP whitelist in Atlas
- Check database user credentials

**Problem**: Email not sending
- Verify SMTP credentials
- Check Gmail App Password
- Review email service logs

### Frontend Issues

**Problem**: API calls failing
- Check CORS configuration
- Verify API URL in environment variables
- Check network tab in browser DevTools

**Problem**: Build fails
- Clear node_modules and reinstall
- Check for syntax errors
- Verify all dependencies are installed

## 📞 Support

For deployment issues:
- Check hosting provider documentation
- Review application logs
- Contact support: info@hlstech.co.zm

---

**Deployment completed! 🎉**

Your HLS Tech website is now live and ready to serve clients!

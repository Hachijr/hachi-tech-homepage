# ⚡ Quick Start Guide - HLS Tech

Get your HLS Tech website running in 5 minutes!

## 🎯 Prerequisites

- Node.js installed (v16+)
- MongoDB installed locally OR MongoDB Atlas account
- Code editor (VS Code recommended)

## 🚀 Quick Setup

### Step 1: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in a new terminal)
cd frontend
npm install
```

### Step 2: Configure Environment

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hls-tech
JWT_SECRET=my_super_secret_key_12345
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@hlstech.co.zm
FRONTEND_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123
```

**Frontend** - Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Seed Database

```bash
cd backend
npm run seed
```

You should see:
```
✅ MongoDB connected successfully
🗑️  Cleared existing data
👤 Super admin created
🛠️  Services created
📁 Sample projects created
⭐ Sample testimonials created

✅ Database seeded successfully!

📝 Login credentials:
   Username: admin
   Password: Admin@123
```

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access the Application

- **Public Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/login

**Admin Login:**
- Username: `admin`
- Password: `Admin@123`

## 🎨 What You'll See

### Public Website
- **Home**: Hero section, stats, services, featured projects, testimonials
- **About**: Company story, mission, vision, values
- **Services**: All available services with details
- **Projects**: Portfolio with filtering by category
- **Blog**: Tech articles and insights
- **Contact**: Contact form and information

### Admin Dashboard
- **Dashboard**: Analytics and statistics
- **Projects**: Manage portfolio projects
- **Blogs**: Create and publish blog posts
- **Services**: Manage service offerings
- **Testimonials**: Approve and manage testimonials
- **Contacts**: View and respond to messages

## 📝 Common Tasks

### Add a New Project

1. Go to http://localhost:3000/admin/projects
2. Click "Add Project"
3. Fill in details:
   - Title
   - Description
   - Image URL (use Unsplash for free images)
   - Category
   - Tech Stack (comma-separated)
   - Links (optional)
4. Check "Featured" to show on homepage
5. Click "Create Project"

### Publish a Blog Post

1. Go to http://localhost:3000/admin/blogs
2. Click "Add Blog Post"
3. Fill in:
   - Title
   - Excerpt (short summary)
   - Content (full article)
   - Featured Image URL
   - Category
   - Tags
4. Check "Publish" to make it live
5. Click "Create Blog"

### Manage Contact Messages

1. Go to http://localhost:3000/admin/contacts
2. Click on any message to view details
3. Change status: New → Read → Responded → Archived
4. Delete spam messages

## 🛠️ Customization

### Change Brand Colors

Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  primary: '#007BFF',    // Your brand color
  secondary: '#0056b3',  // Secondary color
}
```

### Update Company Information

Edit `frontend/src/pages/public/About.jsx` and `Footer.jsx`

### Add Social Media Links

Edit `frontend/src/components/public/Footer.jsx`:
```javascript
<a href="https://facebook.com/yourpage">
  <Facebook size={20} />
</a>
```

## 🐛 Troubleshooting

### MongoDB Connection Error

**Problem**: `MongooseServerSelectionError`

**Solution**:
1. Make sure MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl start mongod
   ```
2. Or use MongoDB Atlas (cloud) instead

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Email Not Sending

**Problem**: Contact form emails not arriving

**Solution**:
1. Use Gmail App Password (not regular password)
2. Enable 2FA on Gmail
3. Generate App Password in Google Account settings
4. Use that password in `.env` file

## 📚 Next Steps

1. **Customize Content**: Update About page, add your projects
2. **Change Admin Password**: Login and update credentials
3. **Add Real Images**: Replace placeholder images with actual photos
4. **Configure Email**: Set up proper email service
5. **Deploy**: Follow DEPLOYMENT.md when ready to go live

## 💡 Tips

- Use **Unsplash** for free high-quality images
- Test on mobile devices using browser DevTools
- Keep admin password secure
- Regularly backup your database
- Monitor contact form for spam

## 🆘 Need Help?

- Check README.md for detailed documentation
- Review DEPLOYMENT.md for production setup
- Contact: info@hlstech.co.zm

---

**Happy Building! 🚀**

Your HLS Tech website is ready for customization and deployment!

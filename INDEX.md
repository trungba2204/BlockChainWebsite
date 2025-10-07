# 📚 TÀI LIỆU HƯỚNG DẪN - INDEX

Chào mừng bạn đến với **Blockchain Company Website**! 🎉

## 🚀 Bắt đầu nhanh

Nếu bạn mới bắt đầu, đọc theo thứ tự:

1. **[QUICKSTART.md](QUICKSTART.md)** ⚡
   - Khởi chạy project trong 5 phút
   - Tạo admin account
   - Test các tính năng cơ bản

2. **[SUMMARY.md](SUMMARY.md)** 📋
   - Tổng quan về project
   - Các tính năng đã implement
   - Technology stack
   - Quick reference

3. **[README.md](README.md)** 📖
   - Tài liệu chính thức đầy đủ
   - Hướng dẫn cài đặt chi tiết
   - API documentation
   - Cấu trúc project

---

## 📖 Tài liệu chi tiết

### Cho Developers

4. **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** 🏗️
   - Kiến trúc hệ thống
   - Cấu trúc thư mục
   - Design patterns
   - Data flow

5. **[API_EXAMPLES.md](API_EXAMPLES.md)** 📡
   - Ví dụ sử dụng API
   - cURL commands
   - Request/Response examples
   - Authentication flow

6. **[DATABASE_SCHEMA.sql](DATABASE_SCHEMA.sql)** 🗄️
   - Database schema đầy đủ
   - Sample data
   - Useful queries
   - Indexes

7. **[FEATURES.md](FEATURES.md)** ✨
   - Danh sách tính năng hoàn chỉnh
   - Feature checklist
   - Planned features
   - Roadmap

---

## 🚀 Cho DevOps

8. **[DEPLOYMENT.md](DEPLOYMENT.md)** 🌐
   - Hướng dẫn deployment chi tiết
   - VPS setup
   - Nginx configuration
   - SSL/HTTPS setup
   - Troubleshooting
   - Monitoring & logging

9. **[START.sh](START.sh)** ▶️
   - Script để start application
   - One-command deployment

10. **[STOP.sh](STOP.sh)** ⏹️
    - Script để stop application

---

## 🎨 Cho Designers & Customization

11. **[CUSTOMIZE.md](CUSTOMIZE.md)** 🎨
    - Thay đổi logo và branding
    - Color scheme customization
    - Typography changes
    - Theme switching
    - Adding new features
    - Multi-language support

12. **[frontend/src/assets/images/README.md](frontend/src/assets/images/README.md)** 🖼️
    - Image guidelines
    - Asset optimization
    - File naming conventions

---

## 🔧 Configuration Files

### Backend
- `backend/pom.xml` - Maven dependencies
- `backend/src/main/resources/application.properties` - Main config
- `backend/src/main/resources/application-docker.properties` - Docker config
- `backend/Dockerfile` - Backend container

### Frontend
- `frontend/package.json` - NPM dependencies
- `frontend/angular.json` - Angular configuration
- `frontend/tsconfig.json` - TypeScript config
- `frontend/nginx.conf` - Nginx web server
- `frontend/Dockerfile` - Frontend container

### Docker
- `docker-compose.yml` - Orchestration
- `.env.example` - Environment variables template
- `.dockerignore` - Docker ignore patterns

---

## 📊 Quick Reference

### URLs
```
Frontend:        http://localhost
Backend API:     http://localhost:8080/api
Swagger UI:      http://localhost:8080/api/swagger-ui.html
Admin Panel:     http://localhost/admin
```

### Default Credentials
```
Username: admin
Password: Admin@123
(Create via API - see QUICKSTART.md)
```

### Commands
```bash
# Start application
./START.sh
# OR
docker-compose up -d

# Stop application
./STOP.sh
# OR
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up -d --build
```

---

## 🎓 Learning Path

### Beginner
1. Read **QUICKSTART.md**
2. Start the application
3. Explore the UI
4. Create admin account
5. Add sample content via Admin Panel

### Intermediate
1. Read **README.md**
2. Understand **PROJECT_STRUCTURE.md**
3. Try **API_EXAMPLES.md**
4. Customize via **CUSTOMIZE.md**

### Advanced
1. Study **DEPLOYMENT.md**
2. Deploy to VPS
3. Setup SSL
4. Configure monitoring
5. Implement custom features

---

## 🆘 Cần giúp đỡ?

### Vấn đề thường gặp
→ Xem phần **Troubleshooting** trong [DEPLOYMENT.md](DEPLOYMENT.md)

### API không hoạt động
→ Kiểm tra [API_EXAMPLES.md](API_EXAMPLES.md)

### Muốn customize
→ Đọc [CUSTOMIZE.md](CUSTOMIZE.md)

### Deploy lên server
→ Follow [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📞 Support

- 📧 Email: support@yourcompany.com
- 💬 GitHub Issues: [Create Issue](https://github.com/yourrepo/issues)
- 📖 Documentation: All .md files in root directory

---

## 🎯 Project Stats

```
📁 Total Files:        100+
📝 Lines of Code:      8,000+
⚙️ API Endpoints:      40+
🎨 UI Components:      25+
📄 Pages:              15+
🔒 Auth Routes:        2
👑 Admin Routes:       6
📊 Database Tables:    9
```

---

## 🏆 Features Highlight

✅ **Full-Stack** - Angular + Spring Boot + MySQL  
✅ **Responsive** - Desktop + Tablet + Mobile  
✅ **Secure** - JWT + BCrypt + Role-based  
✅ **Complete CRUD** - All modules  
✅ **Admin Panel** - Full management  
✅ **Docker Ready** - One-command deploy  
✅ **Well Documented** - 10+ doc files  
✅ **Production Ready** - Optimized & tested  

---

## 🗺️ Documentation Map

```
📚 Documentation/
│
├── 🚀 Getting Started
│   ├── QUICKSTART.md          ⭐ Start here!
│   ├── README.md              📖 Main docs
│   └── SUMMARY.md             📋 Overview
│
├── 💻 Development
│   ├── PROJECT_STRUCTURE.md   🏗️ Architecture
│   ├── API_EXAMPLES.md        📡 API usage
│   ├── DATABASE_SCHEMA.sql    🗄️ Database
│   └── FEATURES.md            ✨ Feature list
│
├── 🚀 Deployment
│   ├── DEPLOYMENT.md          🌐 Deploy guide
│   ├── START.sh               ▶️ Start script
│   └── STOP.sh                ⏹️ Stop script
│
├── 🎨 Customization
│   ├── CUSTOMIZE.md           🎨 Custom guide
│   └── assets/images/README.md 🖼️ Assets guide
│
└── 📋 This File
    └── INDEX.md               📚 You are here
```

---

## ✅ Checklist cho người mới

- [ ] Đọc QUICKSTART.md
- [ ] Install Docker & Docker Compose
- [ ] Run `docker-compose up -d`
- [ ] Tạo admin account
- [ ] Login vào admin panel
- [ ] Thêm sample data
- [ ] Test các trang public
- [ ] Đọc CUSTOMIZE.md để tùy chỉnh
- [ ] Deploy lên VPS (optional)

---

## 🎓 Recommended Reading Order

### Day 1 - Setup
1. INDEX.md (this file)
2. QUICKSTART.md
3. README.md

### Day 2 - Understanding
1. SUMMARY.md
2. PROJECT_STRUCTURE.md
3. FEATURES.md

### Day 3 - Development
1. API_EXAMPLES.md
2. DATABASE_SCHEMA.sql
3. CUSTOMIZE.md

### Day 4 - Deployment
1. DEPLOYMENT.md
2. Production deployment
3. SSL setup

---

## 🌟 Pro Tips

💡 **Tip 1:** Luôn đọc QUICKSTART.md trước khi bắt đầu  
💡 **Tip 2:** Sử dụng Swagger UI để test API  
💡 **Tip 3:** Kiểm tra docker-compose logs khi có lỗi  
💡 **Tip 4:** Backup database trước khi update  
💡 **Tip 5:** Đọc CUSTOMIZE.md để tùy biến theo ý muốn  

---

## 📌 Quick Links

- [Start Application](QUICKSTART.md#bước-2-clone-và-chạy)
- [Create Admin User](QUICKSTART.md#bước-3-tạo-admin-user)
- [API Documentation](API_EXAMPLES.md)
- [Deploy to VPS](DEPLOYMENT.md#2️⃣-deployment-lên-vps-ubuntu)
- [Customize Colors](CUSTOMIZE.md#2-màu-sắc-color-palette)

---

**Chúc bạn thành công với dự án! 🚀**

*Nếu có câu hỏi, đừng ngần ngại tạo Issue trên GitHub hoặc liên hệ support team.*

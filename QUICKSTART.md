# ⚡ QUICK START GUIDE

## 🚀 Chạy nhanh với Docker (5 phút)

### Bước 1: Cài đặt Docker
- **Windows/Mac**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: 
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Bước 2: Clone và chạy

```bash
# Clone project
git clone <your-repo>
cd BlockChainProject

# Chạy toàn bộ hệ thống
docker-compose up -d

# Đợi 1-2 phút để các services khởi động
```

### Bước 3: Tạo admin user

```bash
# Tạo admin account
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@blockchain.com",
    "password": "Admin@123",
    "roles": ["ADMIN"]
  }'
```

### Bước 4: Truy cập

- **Website**: http://localhost
- **Admin Panel**: http://localhost/admin
  - Username: `admin`
  - Password: `Admin@123`
- **Swagger API Docs**: http://localhost:8080/api/swagger-ui.html

---

## 🛠️ Development Mode

### Backend (Spring Boot)

```bash
cd backend

# Đảm bảo MySQL đang chạy trên localhost:3306
# Hoặc start MySQL container:
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=blockchain_db mysql:8.0

# Run backend
./mvnw spring-boot:run

# Backend chạy tại: http://localhost:8080
```

### Frontend (Angular)

```bash
cd frontend

# Cài đặt dependencies
npm install

# Run dev server
npm start

# Frontend chạy tại: http://localhost:4200
```

---

## 📱 Test API với cURL

### Đăng ký user mới
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

### Đăng nhập
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123"
  }'
```

Response sẽ chứa JWT token:
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "admin",
  "email": "admin@blockchain.com",
  "roles": ["ROLE_ADMIN"]
}
```

### Tạo blog post (cần ADMIN role)
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:8080/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "My First Blog Post",
    "summary": "This is a summary",
    "content": "Full content here...",
    "author": "Admin",
    "published": true
  }'
```

---

## 🔍 Kiểm tra Health

```bash
# Check all services
docker-compose ps

# Expected output:
# blockchain-db        Up (healthy)
# blockchain-backend   Up
# blockchain-frontend  Up

# Check logs
docker-compose logs backend | tail -20
```

---

## ⚠️ Common Issues

### Port đã được sử dụng
```bash
# Đổi port trong docker-compose.yml
# Ví dụ: "8081:80" thay vì "80:80"
```

### Database connection failed
```bash
# Restart database
docker-compose restart db

# Hoặc xóa và tạo lại
docker-compose down -v
docker-compose up -d
```

### Frontend không load được
```bash
# Clear browser cache
# Hoặc access incognito mode
# Kiểm tra browser console cho errors
```

---

## 🎯 Next Steps

1. ✅ Đăng nhập vào Admin Panel
2. ✅ Tạo Categories cho Blog và Project
3. ✅ Thêm Team Members
4. ✅ Tạo Blog posts
5. ✅ Tạo Projects
6. ✅ Tạo Career openings
7. ✅ Test Contact form

---

## 📞 Cần giúp đỡ?

- 📖 Đọc [README.md](README.md) để biết chi tiết
- 📖 Đọc [DEPLOYMENT.md](DEPLOYMENT.md) cho production deployment
- 🐛 Report bugs tại GitHub Issues

**Happy coding! 🎉**

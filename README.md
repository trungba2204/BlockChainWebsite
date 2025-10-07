# Blockchain Company Website - Full Stack Application

Website full-stack hoàn chỉnh cho công ty Blockchain, được xây dựng dựa trên thiết kế Figma với Angular (Frontend) và Spring Boot (Backend).

## 🚀 Tính năng chính

### Frontend (Angular 17)
- ✅ Responsive design theo thiết kế Figma
- ✅ Trang chủ (Home) với hero section, features, photo grid
- ✅ Trang giới thiệu (About Us) với team members
- ✅ Trang dự án (Projects)
- ✅ Trang blog với chi tiết bài viết
- ✅ Trang tuyển dụng (Careers)
- ✅ Trang liên hệ (Contact) với form
- ✅ Đăng nhập / Đăng ký
- ✅ Admin panel với CRUD đầy đủ
- ✅ JWT Authentication & Authorization
- ✅ Role-based access control (ADMIN, USER)

### Backend (Spring Boot 3.2)
- ✅ RESTful API với Swagger UI
- ✅ JWT Authentication & Security
- ✅ Role-based Authorization
- ✅ CRUD APIs cho:
  - Blogs
  - Projects
  - Team Members
  - Careers
  - Contacts
  - Categories
- ✅ MySQL Database với JPA/Hibernate
- ✅ Input validation
- ✅ Exception handling

### DevOps
- ✅ Docker containerization
- ✅ Docker Compose orchestration
- ✅ Production-ready configuration

## 📋 Yêu cầu hệ thống

- Docker & Docker Compose
- (Hoặc) Node.js 20+ & Java 17+ & MySQL 8.0

## 🏗️ Cấu trúc dự án

```
BlockChainProject/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/com/blockchain/
│   │   ├── config/            # Security, CORS config
│   │   ├── controller/        # REST Controllers
│   │   ├── entity/            # JPA Entities
│   │   ├── repository/        # JPA Repositories
│   │   ├── service/           # Business Logic
│   │   ├── dto/               # Data Transfer Objects
│   │   └── security/          # JWT Security
│   ├── pom.xml
│   └── Dockerfile
├── frontend/                   # Angular Frontend
│   ├── src/app/
│   │   ├── components/        # Shared Components
│   │   ├── pages/             # Page Components
│   │   ├── services/          # API Services
│   │   ├── guards/            # Route Guards
│   │   ├── models/            # TypeScript Models
│   │   └── interceptors/      # HTTP Interceptors
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🚀 Cách chạy dự án

### Phương án 1: Sử dụng Docker Compose (Khuyến nghị)

1. **Clone repository và di chuyển vào thư mục:**
```bash
cd BlockChainProject
```

2. **Chạy toàn bộ hệ thống bằng một lệnh:**
```bash
docker-compose up -d
```

3. **Kiểm tra trạng thái containers:**
```bash
docker-compose ps
```

4. **Truy cập ứng dụng:**
- Frontend: http://localhost:80
- Backend API: http://localhost:8080/api
- Swagger UI: http://localhost:8080/api/swagger-ui.html

5. **Dừng hệ thống:**
```bash
docker-compose down
```

6. **Dừng và xóa volumes (database):**
```bash
docker-compose down -v
```

### Phương án 2: Chạy thủ công

#### Backend (Spring Boot)

1. **Cài đặt MySQL và tạo database:**
```sql
CREATE DATABASE blockchain_db;
```

2. **Cấu hình database trong `backend/src/main/resources/application.properties`:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/blockchain_db
spring.datasource.username=root
spring.datasource.password=your_password
```

3. **Build và chạy backend:**
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

Backend sẽ chạy tại: http://localhost:8080

#### Frontend (Angular)

1. **Cài đặt dependencies:**
```bash
cd frontend
npm install
```

2. **Chạy development server:**
```bash
npm start
```

Frontend sẽ chạy tại: http://localhost:4200

3. **Build cho production:**
```bash
npm run build
```

## 👤 Tài khoản mặc định

Sau khi khởi động lần đầu, bạn cần tạo tài khoản admin:

1. Truy cập http://localhost:80/signup
2. Đăng ký tài khoản mới
3. Vào database và cập nhật role:

```sql
USE blockchain_db;
UPDATE user_roles SET role = 'ADMIN' WHERE user_id = 1;
```

Hoặc sử dụng API để tạo user với role ADMIN:

```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@blockchain.com",
    "password": "admin123",
    "fullName": "Admin User",
    "roles": ["ADMIN"]
  }'
```

## 📚 API Documentation

Sau khi backend chạy, truy cập Swagger UI:
- URL: http://localhost:8080/api/swagger-ui.html

### Các API Endpoints chính:

#### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/signup` - Đăng ký

#### Blogs
- `GET /api/blogs/published` - Lấy blogs đã publish (Public)
- `GET /api/blogs` - Lấy tất cả blogs (Admin)
- `GET /api/blogs/{id}` - Lấy blog theo ID
- `POST /api/blogs` - Tạo blog mới (Admin)
- `PUT /api/blogs/{id}` - Cập nhật blog (Admin)
- `DELETE /api/blogs/{id}` - Xóa blog (Admin)

#### Projects
- `GET /api/projects` - Lấy tất cả projects
- `GET /api/projects/featured` - Lấy featured projects
- `GET /api/projects/{id}` - Lấy project theo ID
- `POST /api/projects` - Tạo project mới (Admin)
- `PUT /api/projects/{id}` - Cập nhật project (Admin)
- `DELETE /api/projects/{id}` - Xóa project (Admin)

#### Team Members
- `GET /api/team-members/active` - Lấy team members đang active
- `GET /api/team-members` - Lấy tất cả team members (Admin)
- `POST /api/team-members` - Tạo team member (Admin)
- `PUT /api/team-members/{id}` - Cập nhật team member (Admin)
- `DELETE /api/team-members/{id}` - Xóa team member (Admin)

#### Careers
- `GET /api/careers/active` - Lấy job openings đang active
- `GET /api/careers` - Lấy tất cả careers (Admin)
- `POST /api/careers` - Tạo career (Admin)
- `PUT /api/careers/{id}` - Cập nhật career (Admin)
- `DELETE /api/careers/{id}` - Xóa career (Admin)

#### Contacts
- `POST /api/contacts` - Gửi contact form (Public)
- `GET /api/contacts` - Lấy tất cả contacts (Admin)
- `PUT /api/contacts/{id}/status` - Cập nhật status (Admin)
- `DELETE /api/contacts/{id}` - Xóa contact (Admin)

## 🎨 Thiết kế

Website được thiết kế dựa trên Figma:
- [Figma Design Link](https://www.figma.com/design/Uguim6qHhpa31dfVcvbFJd/Block-Chain-Company-Website--Community-)

### Màu sắc chính:
- Primary Blue: #0014F4
- Secondary Pink: #FF3FDB
- Dark Background: #17181D
- Border Color: #383A41
- Text White: #FFFFFF
- Gray Text: #D9D9D9

### Fonts:
- Heading: Outfit (400, 500, 700)
- Body: Satoshi (400, 500, 700)

## 🔒 Bảo mật

- ✅ JWT Token-based authentication
- ✅ Password encryption với BCrypt
- ✅ Role-based authorization (ADMIN, USER)
- ✅ CORS configuration
- ✅ SQL Injection protection (JPA)
- ✅ XSS protection
- ✅ HTTPS ready

## 📦 Deployment

### Deploy lên VPS

1. **Cài đặt Docker & Docker Compose trên VPS**

2. **Clone project:**
```bash
git clone <your-repo-url>
cd BlockChainProject
```

3. **Cấu hình environment variables (tùy chọn):**
```bash
# Tạo file .env
cp .env.example .env
# Chỉnh sửa các biến môi trường
nano .env
```

4. **Chạy containers:**
```bash
docker-compose up -d
```

5. **Kiểm tra logs:**
```bash
docker-compose logs -f
```

### Update code

```bash
git pull
docker-compose down
docker-compose up -d --build
```

## 🛠️ Development

### Backend Development

```bash
cd backend
./mvnw spring-boot:run
```

Hot reload được bật tự động với Spring DevTools.

### Frontend Development

```bash
cd frontend
npm start
```

Angular development server chạy với hot reload tại http://localhost:4200

## 📝 Database Schema

Database sẽ tự động được tạo khi chạy lần đầu (Hibernate DDL Auto = update).

### Các bảng chính:
- `users` - Người dùng và authentication
- `user_roles` - Roles của user
- `blogs` - Bài viết blog
- `projects` - Dự án
- `team_members` - Thành viên team
- `careers` - Vị trí tuyển dụng
- `contacts` - Tin nhắn liên hệ
- `categories` - Danh mục cho blog/project

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 👨‍💻 Tác giả

Developed with ❤️ by Your Name

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo Pull Request hoặc Issue.

## 📞 Hỗ trợ

Nếu gặp vấn đề, vui lòng tạo Issue trên GitHub hoặc liên hệ: support@yourcompany.com

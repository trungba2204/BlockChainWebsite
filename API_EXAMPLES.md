# 📡 API Usage Examples

## Base URL
```
http://localhost:8080/api
```

---

## 🔐 Authentication APIs

### 1. Đăng ký tài khoản mới

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "Password@123",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "roles": ["USER"]
}
```

**Response:** `200 OK`
```json
{
  "message": "User registered successfully!"
}
```

### 2. Đăng nhập

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "Password@123"
}
```

**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb2huZG9lIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE3MDAwODY0MDB9...",
  "type": "Bearer",
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "roles": ["ROLE_USER"]
}
```

---

## 📝 Blog APIs

### 3. Lấy danh sách blogs đã publish (Public)

**Endpoint:** `GET /blogs/published`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Responsive Web Design",
    "summary": "Learn about responsive web design...",
    "content": "Full content...",
    "imageUrl": "https://example.com/image.jpg",
    "author": "John Doe",
    "categoryId": 1,
    "categoryName": "Web Development",
    "published": true,
    "viewCount": 150,
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2024-01-01T10:00:00"
  }
]
```

### 4. Tạo blog mới (Admin only)

**Endpoint:** `POST /blogs`

**Headers:**
```
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Introduction to Blockchain",
  "summary": "A comprehensive guide to blockchain technology",
  "content": "Blockchain is a distributed ledger technology...",
  "imageUrl": "https://example.com/blockchain.jpg",
  "author": "Tech Expert",
  "categoryId": 1,
  "published": true
}
```

**Response:** `200 OK`
```json
{
  "id": 2,
  "title": "Introduction to Blockchain",
  "summary": "A comprehensive guide to blockchain technology",
  "content": "Blockchain is a distributed ledger technology...",
  "imageUrl": "https://example.com/blockchain.jpg",
  "author": "Tech Expert",
  "categoryId": 1,
  "categoryName": "Technology",
  "published": true,
  "viewCount": 0,
  "createdAt": "2024-01-15T14:30:00",
  "updatedAt": "2024-01-15T14:30:00"
}
```

### 5. Cập nhật blog (Admin only)

**Endpoint:** `PUT /blogs/{id}`

**Headers:**
```
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "summary": "Updated summary",
  "content": "Updated content...",
  "published": true
}
```

### 6. Xóa blog (Admin only)

**Endpoint:** `DELETE /blogs/{id}`

**Headers:**
```
Authorization: Bearer {your_jwt_token}
```

**Response:** `200 OK`

### 7. Tìm kiếm blog

**Endpoint:** `GET /blogs/search?keyword=blockchain`

**Response:** `200 OK` (Array of blogs)

---

## 🚀 Project APIs

### 8. Lấy danh sách projects

**Endpoint:** `GET /projects`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Project 1",
    "description": "Lorem ipsum dolor sit amet...",
    "detailContent": "Detailed description...",
    "imageUrl": "https://example.com/project1.jpg",
    "additionalImages": [
      "https://example.com/img1.jpg",
      "https://example.com/img2.jpg"
    ],
    "categoryId": 1,
    "categoryName": "Blockchain",
    "clientName": "ABC Corp",
    "projectUrl": "https://project.example.com",
    "featured": true,
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2024-01-01T10:00:00"
  }
]
```

### 9. Tạo project mới (Admin only)

**Endpoint:** `POST /projects`

**Headers:**
```
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Blockchain Payment System",
  "description": "Secure payment system using blockchain",
  "detailContent": "Full project description...",
  "imageUrl": "https://example.com/project.jpg",
  "additionalImages": [],
  "categoryId": 1,
  "clientName": "XYZ Company",
  "projectUrl": "https://xyz.com",
  "featured": true
}
```

---

## 👥 Team Member APIs

### 10. Lấy team members đang active

**Endpoint:** `GET /team-members/active`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "fullName": "Alice Johnson",
    "position": "CEO & Founder",
    "bio": "Passionate about blockchain...",
    "imageUrl": "https://example.com/alice.jpg",
    "email": "alice@company.com",
    "linkedin": "https://linkedin.com/in/alice",
    "twitter": "https://twitter.com/alice",
    "displayOrder": 1,
    "active": true,
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2024-01-01T10:00:00"
  }
]
```

### 11. Tạo team member (Admin only)

**Endpoint:** `POST /team-members`

**Headers:**
```
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "fullName": "Bob Smith",
  "position": "CTO",
  "bio": "Expert in distributed systems",
  "imageUrl": "https://example.com/bob.jpg",
  "email": "bob@company.com",
  "linkedin": "https://linkedin.com/in/bob",
  "twitter": "https://twitter.com/bob",
  "displayOrder": 2,
  "active": true
}
```

---

## 💼 Career APIs

### 12. Lấy job openings đang active

**Endpoint:** `GET /careers/active`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Senior Blockchain Developer",
    "description": "We are looking for...",
    "requirements": "- 5+ years experience\n- Solid understanding of blockchain",
    "responsibilities": "- Design and develop blockchain solutions",
    "jobType": "FULL_TIME",
    "workLocation": "REMOTE",
    "location": "Global",
    "salaryRange": "$120k - $180k",
    "active": true,
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2024-01-01T10:00:00"
  }
]
```

### 13. Tạo career opening (Admin only)

**Endpoint:** `POST /careers`

**Headers:**
```
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Frontend Developer",
  "description": "Join our amazing team...",
  "requirements": "- 3+ years Angular experience\n- TypeScript expert",
  "responsibilities": "- Build responsive web applications",
  "jobType": "FULL_TIME",
  "workLocation": "ON_SITE",
  "location": "New York, USA",
  "salaryRange": "$90k - $130k",
  "active": true
}
```

**Job Types:**
- `FULL_TIME`
- `PART_TIME`
- `CONTRACT`
- `INTERNSHIP`

**Work Locations:**
- `ON_SITE`
- `REMOTE`
- `HYBRID`

---

## 📧 Contact APIs

### 14. Gửi contact form (Public)

**Endpoint:** `POST /contacts`

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Partnership Inquiry",
  "message": "I would like to discuss a potential partnership..."
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Partnership Inquiry",
  "message": "I would like to discuss a potential partnership...",
  "status": "NEW",
  "createdAt": "2024-01-15T14:30:00"
}
```

### 15. Cập nhật status contact (Admin only)

**Endpoint:** `PUT /contacts/{id}/status?status=RESOLVED`

**Headers:**
```
Authorization: Bearer {your_jwt_token}
```

**Status values:**
- `NEW`
- `IN_PROGRESS`
- `RESOLVED`

---

## 📂 Category APIs

### 16. Lấy tất cả categories

**Endpoint:** `GET /categories`

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Blockchain",
    "slug": "blockchain",
    "description": "Blockchain related content",
    "type": "BLOG",
    "createdAt": "2024-01-01T10:00:00",
    "updatedAt": "2024-01-01T10:00:00"
  }
]
```

### 17. Lấy categories theo type

**Endpoint:** `GET /categories/type/BLOG`

**Type values:**
- `BLOG`
- `PROJECT`

### 18. Tạo category (Admin only)

**Endpoint:** `POST /categories`

**Headers:**
```
Authorization: Bearer {your_jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Artificial Intelligence",
  "slug": "ai",
  "description": "AI and Machine Learning content",
  "type": "BLOG"
}
```

---

## 🧪 Testing với cURL

### Setup
```bash
# Set base URL
API_URL="http://localhost:8080/api"

# Login and get token
TOKEN=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}' \
  | jq -r '.token')

echo "Token: $TOKEN"
```

### Create a blog post
```bash
curl -X POST $API_URL/blogs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Blog Post",
    "summary": "Short summary",
    "content": "Full content here...",
    "author": "Admin",
    "published": true
  }'
```

### Get all projects
```bash
curl -X GET $API_URL/projects \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📊 Error Responses

### 400 Bad Request
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/blogs"
}
```

### 401 Unauthorized
```json
{
  "status": 401,
  "error": "Unauthorized",
  "message": "Full authentication is required",
  "path": "/api/admin/users"
}
```

### 403 Forbidden
```json
{
  "status": 403,
  "error": "Forbidden",
  "message": "Access Denied",
  "path": "/api/blogs"
}
```

### 404 Not Found
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Blog not found with id: 999",
  "path": "/api/blogs/999"
}
```

---

## 🔗 Postman Collection

Import vào Postman để test nhanh:

1. Tạo Collection mới: "Blockchain Website API"
2. Add Environment:
   - `baseUrl`: `http://localhost:8080/api`
   - `token`: `{{token}}` (sẽ được set sau khi login)
3. Import các requests từ file này
4. Test thôi!

**Hoặc download Postman collection:**
- [Download Collection](./postman_collection.json)

---

## 💡 Tips

1. **Luôn include JWT token** cho các endpoint cần authentication
2. **Check Swagger UI** để xem full API documentation
3. **Use jq** để parse JSON responses dễ dàng hơn
4. **Save token** vào biến để reuse

```bash
# Parse token với jq
TOKEN=$(curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}' | jq -r '.token')

# Use token in subsequent requests
curl -X GET http://localhost:8080/api/blogs \
  -H "Authorization: Bearer $TOKEN"
```

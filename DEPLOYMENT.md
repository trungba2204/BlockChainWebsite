# 📚 HƯỚNG DẪN DEPLOYMENT CHI TIẾT

## 🎯 Mục lục
1. [Deployment với Docker Compose](#deployment-với-docker-compose)
2. [Deployment lên VPS Ubuntu](#deployment-lên-vps-ubuntu)
3. [Deployment với Nginx Reverse Proxy](#deployment-với-nginx-reverse-proxy)
4. [SSL/HTTPS Configuration](#sslhttps-configuration)
5. [Troubleshooting](#troubleshooting)

---

## 1️⃣ Deployment với Docker Compose

### Bước 1: Chuẩn bị môi trường

Đảm bảo đã cài đặt:
- Docker Engine 20.10+
- Docker Compose 2.0+

Kiểm tra version:
```bash
docker --version
docker-compose --version
```

### Bước 2: Clone và cấu hình

```bash
# Clone project
git clone <your-repo-url>
cd BlockChainProject

# Copy environment file (nếu có)
cp .env.example .env
```

### Bước 3: Build và chạy

```bash
# Build và start tất cả services
docker-compose up -d --build

# Xem logs
docker-compose logs -f

# Kiểm tra status
docker-compose ps
```

### Bước 4: Tạo admin user

**Cách 1: Qua API**
```bash
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@blockchain.com",
    "password": "Admin@123",
    "fullName": "System Administrator",
    "roles": ["ADMIN"]
  }'
```

**Cách 2: Qua Database**
```bash
# Truy cập MySQL container
docker exec -it blockchain-db mysql -uroot -proot

# Trong MySQL console
USE blockchain_db;

# Tìm user ID
SELECT * FROM users WHERE username = 'your_username';

# Update role thành ADMIN
UPDATE user_roles SET role = 'ADMIN' WHERE user_id = 1;

# Exit
EXIT;
```

### Bước 5: Truy cập ứng dụng

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080/api
- **Swagger UI**: http://localhost:8080/api/swagger-ui.html

---

## 2️⃣ Deployment lên VPS Ubuntu

### Bước 1: Chuẩn bị VPS

**Cập nhật hệ thống:**
```bash
sudo apt update && sudo apt upgrade -y
```

**Cài đặt Docker:**
```bash
# Cài đặt prerequisites
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Thêm Docker's GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Cài đặt Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Thêm user vào docker group
sudo usermod -aG docker ${USER}

# Logout và login lại để apply group changes
```

**Cài đặt Docker Compose:**
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

### Bước 2: Upload code lên VPS

**Cách 1: Dùng Git (Khuyến nghị)**
```bash
cd /var/www
sudo git clone <your-repo-url> blockchain-website
cd blockchain-website
```

**Cách 2: Dùng SCP**
```bash
# Từ máy local
scp -r BlockChainProject/ user@your-vps-ip:/var/www/blockchain-website
```

### Bước 3: Cấu hình cho production

```bash
cd /var/www/blockchain-website

# Tạo file .env
sudo nano .env
```

Nội dung `.env`:
```env
# Database
MYSQL_ROOT_PASSWORD=your_strong_password
MYSQL_DATABASE=blockchain_db

# JWT
JWT_SECRET=your_very_long_and_secure_random_string_here

# CORS
CORS_ORIGINS=http://your-domain.com,https://your-domain.com
```

### Bước 4: Chạy application

```bash
# Build và start
sudo docker-compose up -d --build

# Kiểm tra logs
sudo docker-compose logs -f

# Kiểm tra containers đang chạy
sudo docker-compose ps
```

### Bước 5: Cấu hình Firewall

```bash
# Mở port 80 (HTTP)
sudo ufw allow 80/tcp

# Mở port 443 (HTTPS)
sudo ufw allow 443/tcp

# Mở port SSH nếu chưa
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable

# Kiểm tra status
sudo ufw status
```

---

## 3️⃣ Deployment với Nginx Reverse Proxy

### Bước 1: Cài đặt Nginx trên VPS

```bash
sudo apt install -y nginx
```

### Bước 2: Tạo Nginx config

```bash
sudo nano /etc/nginx/sites-available/blockchain-website
```

Nội dung file config:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Bước 3: Enable site

```bash
# Tạo symbolic link
sudo ln -s /etc/nginx/sites-available/blockchain-website /etc/nginx/sites-enabled/

# Test cấu hình
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx để tự động start khi reboot
sudo systemctl enable nginx
```

---

## 4️⃣ SSL/HTTPS Configuration

### Sử dụng Let's Encrypt (Certbot)

```bash
# Cài đặt Certbot
sudo apt install -y certbot python3-certbot-nginx

# Lấy SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

Certbot sẽ tự động:
- Lấy SSL certificate
- Cập nhật Nginx config
- Cấu hình auto-renewal

---

## 5️⃣ Maintenance & Monitoring

### Update ứng dụng

```bash
cd /var/www/blockchain-website

# Pull code mới
git pull origin main

# Rebuild và restart
docker-compose down
docker-compose up -d --build
```

### Xem logs

```bash
# Tất cả services
docker-compose logs -f

# Chỉ backend
docker-compose logs -f backend

# Chỉ frontend
docker-compose logs -f frontend

# Chỉ database
docker-compose logs -f db
```

### Backup Database

```bash
# Backup
docker exec blockchain-db mysqldump -uroot -proot blockchain_db > backup_$(date +%Y%m%d).sql

# Restore
docker exec -i blockchain-db mysql -uroot -proot blockchain_db < backup_20231201.sql
```

### Resource Monitoring

```bash
# Xem resource usage
docker stats

# Xem disk usage
docker system df

# Clean up unused images
docker system prune -a
```

---

## 6️⃣ Troubleshooting

### Problem: Backend không kết nối được database

**Solution:**
```bash
# Kiểm tra MySQL container
docker-compose logs db

# Restart MySQL
docker-compose restart db

# Kiểm tra network
docker network ls
docker network inspect blockchain-network
```

### Problem: Frontend không gọi được API

**Solution:**
1. Kiểm tra CORS configuration trong backend
2. Kiểm tra nginx.conf proxy settings
3. Kiểm tra browser console cho errors

### Problem: Port đã được sử dụng

**Solution:**
```bash
# Tìm process đang dùng port 80
sudo lsof -i :80

# Kill process
sudo kill -9 <PID>

# Hoặc đổi port trong docker-compose.yml
```

### Problem: Out of memory

**Solution:**
```bash
# Tăng Docker memory limit
# Edit docker-compose.yml, thêm:
services:
  backend:
    mem_limit: 2g
  frontend:
    mem_limit: 1g
```

### Problem: Database không khởi động

**Solution:**
```bash
# Xóa volume và tạo lại
docker-compose down -v
docker-compose up -d
```

---

## 7️⃣ Performance Optimization

### Bật Gzip compression

Đã được cấu hình trong `nginx.conf`

### Database Indexing

```sql
-- Thêm indexes cho performance
CREATE INDEX idx_blogs_published ON blogs(published, created_at);
CREATE INDEX idx_projects_featured ON projects(featured, created_at);
CREATE INDEX idx_team_display_order ON team_members(display_order);
```

### Caching

Cấu hình Redis cache (optional):

```yaml
# Thêm vào docker-compose.yml
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

---

## 8️⃣ Security Best Practices

1. **Đổi database password mặc định**
2. **Sử dụng strong JWT secret**
3. **Enable HTTPS**
4. **Giới hạn failed login attempts**
5. **Regular security updates**
6. **Backup thường xuyên**

---

## 9️⃣ Auto-deployment với GitHub Actions

Tạo file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/blockchain-website
            git pull origin main
            docker-compose down
            docker-compose up -d --build
```

---

## 🆘 Support

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra logs: `docker-compose logs -f`
2. Kiểm tra GitHub Issues
3. Liên hệ support team

---

**Chúc bạn deployment thành công! 🎉**

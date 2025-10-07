# 🎨 HƯỚNG DẪN TÙY CHỈNH

## 🏷️ Thay đổi Branding

### 1. Logo

**Cách 1: Thay SVG code**
```html
<!-- File: frontend/src/app/components/header/header.component.html -->
<div class="logo">
  <a routerLink="/">
    <svg width="60" height="60" viewBox="0 0 60 60">
      <!-- Paste your SVG path here -->
    </svg>
    <span class="logo-text">Your Company Name</span>
  </a>
</div>
```

**Cách 2: Dùng file image**
```html
<div class="logo">
  <a routerLink="/">
    <img src="assets/images/logo.png" alt="Company Logo" />
    <span class="logo-text">Your Company Name</span>
  </a>
</div>
```

### 2. Màu sắc (Color Palette)

**File:** `frontend/src/styles.css`

```css
:root {
  /* Thay đổi màu sắc ở đây */
  --primary-color: #0014F4;      /* Màu chính */
  --secondary-color: #FF3FDB;    /* Màu phụ */
  --dark-bg: #17181D;            /* Nền tối */
  --light-bg: #FAFAFA;           /* Nền sáng */
  --text-white: #FFFFFF;         /* Chữ trắng */
  --text-dark: #1E1E1E;          /* Chữ đen */
  --border-color: #383A41;       /* Viền */
  --gray-text: #D9D9D9;          /* Chữ xám */
}
```

**Ví dụ - Đổi sang Green theme:**
```css
:root {
  --primary-color: #10B981;      /* Green */
  --secondary-color: #8B5CF6;    /* Purple */
  /* Giữ nguyên các màu khác hoặc điều chỉnh */
}
```

### 3. Fonts (Typography)

**File:** `frontend/src/index.html`

Thay đổi Google Fonts link:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;700&display=swap" rel="stylesheet">
```

Sau đó update CSS:
```css
/* File: frontend/src/styles.css */
body {
  font-family: 'YourFont', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'YourHeadingFont', sans-serif;
}
```

---

## 📝 Thay đổi nội dung

### 1. Company Information

**File:** `frontend/src/app/pages/home/home.component.ts`

```typescript
// Thay đổi features
features = [
  {
    title: 'Your Feature Title',
    description: 'Your feature description...',
    icon: 'your-icon'
  }
];

// Thay đổi company values
companyValues = [
  {
    title: 'What we do',
    description: 'Your company description...'
  }
];
```

### 2. Footer Information

**File:** `frontend/src/app/components/footer/footer.component.html`

```html
<!-- Update contact info -->
<div class="contact-item">
  <h4>Our Head Office</h4>
  <p>Your actual address here</p>
</div>

<div class="contact-item">
  <h4>Our Hotline</h4>
  <p>+1 Your Phone Number</p>
</div>

<div class="contact-item">
  <h4>Mail Us</h4>
  <p>your-email@company.com</p>
</div>
```

### 3. Copyright & Company Name

**File:** `frontend/src/app/components/footer/footer.component.html`

```html
<p class="copyright">
  Copyright © {{ currentYear }}. All rights reserved by Your Company Name
</p>
```

---

## 🔧 Thay đổi cấu hình

### 1. Backend API URL

**Development:**
```typescript
// File: frontend/src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'  // Đổi port nếu cần
};
```

**Production:**
```typescript
// File: frontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-domain.com/api'  // Your actual domain
};
```

### 2. Database Configuration

**File:** `backend/src/main/resources/application.properties`

```properties
# Thay đổi database credentials
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. JWT Secret

**⚠️ QUAN TRỌNG: Đổi JWT secret cho production!**

```properties
# File: backend/src/main/resources/application.properties
app.jwt.secret=YOUR_VERY_LONG_AND_SECURE_RANDOM_STRING_HERE
app.jwt.expiration=86400000  # 24 hours in milliseconds
```

Generate secure secret:
```bash
openssl rand -base64 64
```

### 4. CORS Origins

```properties
# File: backend/src/main/resources/application.properties
app.cors.allowed-origins=https://yourdomain.com,https://www.yourdomain.com
```

---

## 🎯 Thêm tính năng mới

### 1. Thêm Entity mới

**Bước 1:** Tạo Entity
```java
// File: backend/src/main/java/com/blockchain/entity/Newsletter.java
@Entity
@Table(name = "newsletters")
public class Newsletter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    // ... other fields
}
```

**Bước 2:** Tạo Repository
```java
public interface NewsletterRepository extends JpaRepository<Newsletter, Long> {
    // Custom queries
}
```

**Bước 3:** Tạo Service
```java
@Service
public class NewsletterService {
    // Business logic
}
```

**Bước 4:** Tạo Controller
```java
@RestController
@RequestMapping("/newsletters")
public class NewsletterController {
    // API endpoints
}
```

### 2. Thêm trang mới (Frontend)

**Bước 1:** Generate component
```bash
cd frontend
ng generate component pages/your-new-page
```

**Bước 2:** Add route
```typescript
// File: frontend/src/app/app.routes.ts
{
  path: 'your-page',
  loadComponent: () => import('./pages/your-new-page/your-new-page.component')
    .then(m => m.YourNewPageComponent)
}
```

**Bước 3:** Add navigation link
```html
<!-- File: frontend/src/app/components/header/header.component.html -->
<li>
  <a routerLink="/your-page" class="nav-tab">Your Page</a>
</li>
```

---

## 🌍 Multi-language Support (i18n)

### Setup ngx-translate

1. Install:
```bash
npm install @ngx-translate/core @ngx-translate/http-loader
```

2. Create translation files:
```json
// src/assets/i18n/en.json
{
  "home": {
    "title": "Unlocking the Future of Blockchain",
    "description": "..."
  }
}

// src/assets/i18n/vi.json
{
  "home": {
    "title": "Mở khóa tương lai Blockchain",
    "description": "..."
  }
}
```

3. Use in templates:
```html
<h1>{{ 'home.title' | translate }}</h1>
```

---

## 📧 Email Service Integration

### Backend Email Service

1. Add dependency to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
```

2. Configure:
```properties
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

3. Create EmailService:
```java
@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    
    public void sendContactEmail(Contact contact) {
        // Send email logic
    }
}
```

---

## 📤 File Upload Feature

### Backend

1. Create FileStorageService:
```java
@Service
public class FileStorageService {
    private final Path fileStorageLocation;
    
    public String storeFile(MultipartFile file) {
        // Store file and return URL
    }
}
```

2. Add upload endpoint:
```java
@PostMapping("/upload")
public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
    String fileUrl = fileStorageService.storeFile(file);
    return ResponseEntity.ok(fileUrl);
}
```

### Frontend

```typescript
uploadFile(file: File): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);
  
  return this.http.post<string>('/api/upload', formData);
}
```

---

## 🎨 Theme Customization

### Dark/Light Mode Toggle

1. Add to styles.css:
```css
[data-theme="light"] {
  --dark-bg: #FFFFFF;
  --text-white: #000000;
  /* ... other light theme colors */
}

[data-theme="dark"] {
  --dark-bg: #17181D;
  --text-white: #FFFFFF;
  /* ... dark theme colors */
}
```

2. Toggle function:
```typescript
toggleTheme() {
  const theme = document.documentElement.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
```

---

## 🔍 SEO Optimization

### 1. Meta Tags

**File:** `frontend/src/index.html`

```html
<head>
  <title>Your Company - Blockchain Solutions</title>
  <meta name="description" content="Your company description for SEO">
  <meta name="keywords" content="blockchain, crypto, web3">
  <meta name="author" content="Your Company">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Your Company">
  <meta property="og:description" content="Your description">
  <meta property="og:image" content="https://yoursite.com/og-image.jpg">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Your Company">
</head>
```

### 2. Angular Universal (SSR)

For better SEO, consider adding server-side rendering:
```bash
ng add @nguniversal/express-engine
```

---

## 🔔 Notifications

### Toast Notifications

Install ngx-toastr:
```bash
npm install ngx-toastr
```

Usage:
```typescript
constructor(private toastr: ToastrService) {}

showSuccess() {
  this.toastr.success('Blog created successfully!');
}

showError() {
  this.toastr.error('Failed to create blog');
}
```

---

## 📊 Analytics Integration

### Google Analytics

1. Add to index.html:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

2. Track events:
```typescript
trackEvent(category: string, action: string) {
  (window as any).gtag('event', action, {
    event_category: category
  });
}
```

---

## 💾 Database Backup & Restore

### Backup

```bash
# Manual backup
docker exec blockchain-db mysqldump -uroot -proot blockchain_db > backup.sql

# Automated daily backup (cron)
0 2 * * * docker exec blockchain-db mysqldump -uroot -proot blockchain_db > /backups/blockchain_$(date +\%Y\%m\%d).sql
```

### Restore

```bash
docker exec -i blockchain-db mysql -uroot -proot blockchain_db < backup.sql
```

---

## 🚀 Performance Tuning

### Frontend

1. **Enable Production Mode:**
```typescript
// Already enabled in production build
ng build --configuration production
```

2. **Lazy Loading Images:**
```html
<img [src]="imageUrl" loading="lazy" />
```

3. **OnPush Change Detection:**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### Backend

1. **Database Connection Pool:**
```properties
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
```

2. **JPA Batch Size:**
```properties
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
```

3. **Cache Configuration:**
```java
@EnableCaching
@Configuration
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("blogs", "projects");
    }
}
```

---

## 🔐 Advanced Security

### 1. Rate Limiting

Install Bucket4j:
```xml
<dependency>
    <groupId>com.github.vladimir-bukhtoyarov</groupId>
    <artifactId>bucket4j-core</artifactId>
</dependency>
```

### 2. Password Policy

```java
@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
         message = "Password must contain uppercase, lowercase, number and special character")
private String password;
```

### 3. Two-Factor Authentication

- Add OTP generation
- SMS/Email verification
- TOTP (Google Authenticator)

---

## 🌐 Domain & SSL

### 1. Point Domain to Server

```bash
# In your DNS provider
A Record:     yourdomain.com     → Your_VPS_IP
A Record:     www.yourdomain.com → Your_VPS_IP
```

### 2. Get SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

### 3. Update Nginx Config

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    # ... rest of config
}
```

---

## 📱 Mobile App (Optional)

### React Native / Flutter

Reuse same backend API:
```typescript
// Mobile app API service
const API_URL = 'https://yourapi.com/api';

async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  });
  return response.json();
}
```

---

## 🧪 Custom Validation

### Backend

```java
// Custom validator
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CustomValidator.class)
public @interface CustomValidation {
    String message() default "Invalid value";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```

### Frontend

```typescript
// Custom validator
export function customValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Your validation logic
    return null;
  };
}
```

---

## 📈 Advanced Features

### 1. Rich Text Editor

Install CKEditor:
```bash
npm install @ckeditor/ckeditor5-angular @ckeditor/ckeditor5-build-classic
```

Usage:
```html
<ckeditor [editor]="Editor" [(ngModel)]="blog.content"></ckeditor>
```

### 2. Image Upload with Preview

```html
<input type="file" (change)="onFileSelected($event)" accept="image/*">
<img [src]="imagePreview" *ngIf="imagePreview">
```

```typescript
onFileSelected(event: any) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);
}
```

### 3. Infinite Scroll

```bash
npm install ngx-infinite-scroll
```

### 4. Chart.js Integration

```bash
npm install chart.js ng2-charts
```

For admin dashboard analytics.

---

## 🎭 Custom Animations

### CSS Animations

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
```

### Angular Animations

```typescript
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
```

---

## 🔍 Search Enhancement

### Full-text Search

**Backend:**
```java
@Query("SELECT b FROM Blog b WHERE " +
       "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
       "LOWER(b.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
List<Blog> fullTextSearch(@Param("keyword") String keyword);
```

**Frontend:**
```typescript
searchBlogs(keyword: string) {
  this.blogService.searchBlogs(keyword).subscribe(results => {
    this.blogs = results;
  });
}
```

---

## 💡 Tips & Best Practices

1. **Always validate** input on both frontend and backend
2. **Use environment variables** for sensitive data
3. **Enable logging** in development, minimize in production
4. **Backup database** regularly
5. **Monitor** application performance
6. **Update dependencies** regularly
7. **Use HTTPS** in production
8. **Implement rate limiting** to prevent abuse
9. **Add error boundary** components
10. **Write unit tests** for critical features

---

## 📚 Resources

- [Angular Best Practices](https://angular.io/guide/styleguide)
- [Spring Boot Best Practices](https://www.baeldung.com/spring-boot-best-practices)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)

---

**Happy Customizing! 🎨**

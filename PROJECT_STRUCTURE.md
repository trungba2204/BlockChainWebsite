# 📂 CẤU TRÚC DỰ ÁN CHI TIẾT

## 🏗️ Tổng quan kiến trúc

```
BlockChainProject/
│
├── 📁 backend/                                 # Spring Boot Backend
│   ├── src/main/
│   │   ├── java/com/blockchain/
│   │   │   ├── 📁 config/                     # Configuration Classes
│   │   │   │   ├── CorsConfig.java           # CORS Configuration
│   │   │   │   ├── SecurityConfig.java       # Spring Security Config
│   │   │   │   ├── SwaggerConfig.java        # Swagger/OpenAPI Config
│   │   │   │   └── WebConfig.java            # Web MVC Config
│   │   │   │
│   │   │   ├── 📁 controller/                 # REST API Controllers
│   │   │   │   ├── AuthController.java       # Authentication endpoints
│   │   │   │   ├── BlogController.java       # Blog CRUD API
│   │   │   │   ├── ProjectController.java    # Project CRUD API
│   │   │   │   ├── TeamMemberController.java # Team CRUD API
│   │   │   │   ├── CareerController.java     # Career CRUD API
│   │   │   │   ├── ContactController.java    # Contact API
│   │   │   │   └── CategoryController.java   # Category API
│   │   │   │
│   │   │   ├── 📁 dto/                        # Data Transfer Objects
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── SignupRequest.java
│   │   │   │   ├── JwtResponse.java
│   │   │   │   ├── MessageResponse.java
│   │   │   │   ├── BlogDTO.java
│   │   │   │   ├── ProjectDTO.java
│   │   │   │   ├── TeamMemberDTO.java
│   │   │   │   ├── CareerDTO.java
│   │   │   │   ├── ContactDTO.java
│   │   │   │   └── CategoryDTO.java
│   │   │   │
│   │   │   ├── 📁 entity/                     # JPA Entities
│   │   │   │   ├── User.java                 # User entity với roles
│   │   │   │   ├── Blog.java                 # Blog entity
│   │   │   │   ├── Project.java              # Project entity
│   │   │   │   ├── TeamMember.java           # Team member entity
│   │   │   │   ├── Career.java               # Career entity
│   │   │   │   ├── Contact.java              # Contact entity
│   │   │   │   └── Category.java             # Category entity
│   │   │   │
│   │   │   ├── 📁 repository/                 # JPA Repositories
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── BlogRepository.java
│   │   │   │   ├── ProjectRepository.java
│   │   │   │   ├── TeamMemberRepository.java
│   │   │   │   ├── CareerRepository.java
│   │   │   │   ├── ContactRepository.java
│   │   │   │   └── CategoryRepository.java
│   │   │   │
│   │   │   ├── 📁 security/                   # Security Components
│   │   │   │   ├── JwtUtils.java             # JWT token utilities
│   │   │   │   ├── UserDetailsImpl.java      # UserDetails implementation
│   │   │   │   ├── UserDetailsServiceImpl.java
│   │   │   │   ├── AuthTokenFilter.java      # JWT filter
│   │   │   │   └── AuthEntryPointJwt.java    # Auth entry point
│   │   │   │
│   │   │   ├── 📁 service/                    # Business Logic Services
│   │   │   │   ├── BlogService.java
│   │   │   │   ├── ProjectService.java
│   │   │   │   ├── TeamMemberService.java
│   │   │   │   ├── CareerService.java
│   │   │   │   ├── ContactService.java
│   │   │   │   └── CategoryService.java
│   │   │   │
│   │   │   └── BlockchainApplication.java    # Main Application
│   │   │
│   │   └── resources/
│   │       ├── application.properties         # Main config
│   │       └── application-docker.properties  # Docker config
│   │
│   ├── pom.xml                                # Maven dependencies
│   ├── Dockerfile                             # Backend Docker image
│   └── .dockerignore                          # Docker ignore patterns
│
├── 📁 frontend/                                # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── 📁 components/                 # Shared Components
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   └── header.component.css
│   │   │   │   └── footer/
│   │   │   │       ├── footer.component.ts
│   │   │   │       ├── footer.component.html
│   │   │   │       └── footer.component.css
│   │   │   │
│   │   │   ├── 📁 guards/                     # Route Guards
│   │   │   │   ├── auth.guard.ts             # Authentication guard
│   │   │   │   └── admin.guard.ts            # Admin role guard
│   │   │   │
│   │   │   ├── 📁 interceptors/               # HTTP Interceptors
│   │   │   │   └── auth.interceptor.ts       # JWT token interceptor
│   │   │   │
│   │   │   ├── 📁 models/                     # TypeScript Models
│   │   │   │   ├── user.model.ts
│   │   │   │   ├── blog.model.ts
│   │   │   │   ├── project.model.ts
│   │   │   │   ├── team-member.model.ts
│   │   │   │   ├── career.model.ts
│   │   │   │   ├── contact.model.ts
│   │   │   │   └── category.model.ts
│   │   │   │
│   │   │   ├── 📁 pages/                      # Page Components
│   │   │   │   ├── 📁 home/                   # Home page
│   │   │   │   ├── 📁 about/                  # About page
│   │   │   │   ├── 📁 projects/               # Projects listing
│   │   │   │   ├── 📁 blog/                   # Blog listing
│   │   │   │   ├── 📁 blog-detail/            # Blog detail page
│   │   │   │   ├── 📁 careers/                # Careers listing
│   │   │   │   ├── 📁 contact/                # Contact page
│   │   │   │   ├── 📁 login/                  # Login page
│   │   │   │   ├── 📁 signup/                 # Signup page
│   │   │   │   └── 📁 admin/                  # Admin Panel
│   │   │   │       ├── admin.component.*
│   │   │   │       ├── 📁 dashboard/          # Admin dashboard
│   │   │   │       ├── 📁 blog-management/    # Blog CRUD
│   │   │   │       ├── 📁 project-management/ # Project CRUD
│   │   │   │       ├── 📁 team-management/    # Team CRUD
│   │   │   │       ├── 📁 career-management/  # Career CRUD
│   │   │   │       └── 📁 contact-management/ # Contact management
│   │   │   │
│   │   │   ├── 📁 services/                   # API Services
│   │   │   │   ├── auth.service.ts           # Authentication service
│   │   │   │   ├── blog.service.ts           # Blog API calls
│   │   │   │   ├── project.service.ts        # Project API calls
│   │   │   │   ├── team-member.service.ts    # Team API calls
│   │   │   │   ├── career.service.ts         # Career API calls
│   │   │   │   ├── contact.service.ts        # Contact API calls
│   │   │   │   └── category.service.ts       # Category API calls
│   │   │   │
│   │   │   ├── app.component.ts               # Root component
│   │   │   └── app.routes.ts                  # Routing configuration
│   │   │
│   │   ├── assets/                            # Static assets
│   │   │   └── images/                        # Images
│   │   ├── environments/                      # Environment configs
│   │   │   ├── environment.ts                # Development
│   │   │   └── environment.prod.ts           # Production
│   │   ├── index.html                         # Main HTML
│   │   ├── main.ts                            # Application bootstrap
│   │   └── styles.css                         # Global styles
│   │
│   ├── angular.json                           # Angular CLI config
│   ├── package.json                           # NPM dependencies
│   ├── tsconfig.json                          # TypeScript config
│   ├── Dockerfile                             # Frontend Docker image
│   ├── nginx.conf                             # Nginx configuration
│   └── .dockerignore                          # Docker ignore patterns
│
├── 📄 docker-compose.yml                       # Docker Compose orchestration
├── 📄 .gitignore                               # Git ignore patterns
├── 📄 .env.example                             # Environment variables template
│
└── 📚 Documentation/
    ├── README.md                               # Main documentation
    ├── QUICKSTART.md                           # Quick start guide
    ├── DEPLOYMENT.md                           # Deployment guide
    ├── API_EXAMPLES.md                         # API usage examples
    ├── PROJECT_STRUCTURE.md                    # This file
    ├── DATABASE_SCHEMA.sql                     # Database schema & sample data
    ├── START.sh                                # Start script
    └── STOP.sh                                 # Stop script
```

---

## 🎯 Backend Architecture

### Layers
1. **Controller Layer** - REST API endpoints
2. **Service Layer** - Business logic
3. **Repository Layer** - Database access
4. **Entity Layer** - Database models
5. **Security Layer** - Authentication & Authorization

### Design Patterns
- **Repository Pattern** - Data access abstraction
- **DTO Pattern** - Data transfer between layers
- **Dependency Injection** - Spring IoC
- **MVC Pattern** - Model-View-Controller

---

## 🎨 Frontend Architecture

### Structure
1. **Components** - Reusable UI components
2. **Pages** - Route-based page components
3. **Services** - API communication
4. **Guards** - Route protection
5. **Interceptors** - HTTP request/response handling
6. **Models** - TypeScript interfaces

### Features
- **Standalone Components** - Angular 17 new feature
- **Lazy Loading** - Load modules on demand
- **RxJS** - Reactive programming
- **Route Guards** - Protected routes

---

## 🔒 Security Implementation

### Backend Security
```
Request → JWT Filter → Authentication → Authorization → Controller
```

1. **JWT Token Filter** - Validates token on each request
2. **Authentication Manager** - Verifies credentials
3. **User Details Service** - Loads user data
4. **Method Security** - @PreAuthorize annotations

### Frontend Security
```
HTTP Request → Auth Interceptor → Add JWT Token → Send to Backend
```

1. **Auth Interceptor** - Automatically adds JWT to headers
2. **Auth Guard** - Protects authenticated routes
3. **Admin Guard** - Protects admin-only routes
4. **Auth Service** - Manages login state

---

## 🗄️ Database Design

### Entity Relationships

```
User (1) ───< (many) Blog
User (1) ───< (many) user_roles

Category (1) ───< (many) Blog
Category (1) ───< (many) Project

Project (1) ───< (many) project_images

Team Member - Independent entity
Career - Independent entity
Contact - Independent entity
```

### Indexes
- `users`: username, email
- `blogs`: published + created_at, category_id
- `projects`: featured + created_at, category_id
- `team_members`: active + display_order
- `careers`: active + created_at
- `contacts`: status + created_at

---

## 🔄 Data Flow

### User Authentication Flow
```
1. User submits login form (Frontend)
2. POST /api/auth/login (Backend)
3. Validate credentials
4. Generate JWT token
5. Return token + user info
6. Store token in localStorage (Frontend)
7. Add token to all subsequent requests
```

### CRUD Operations Flow
```
1. User clicks "Add Blog" (Frontend)
2. Fill form and submit
3. POST /api/blogs with JWT token
4. Validate token & check role (Backend)
5. Save to database
6. Return saved entity
7. Update UI (Frontend)
```

---

## 🎨 UI Components Mapping (Figma → Angular)

### Pages
- **Figma: home** → `HomeComponent`
- **Figma: About Us** → `AboutComponent`
- **Figma: projects** → `ProjectsComponent`
- **Figma: blog** → `BlogComponent`
- **Figma: blog-detailed view** → `BlogDetailComponent`
- **Figma: Careers** → `CareersComponent`
- **Figma: contact us** → `ContactComponent`

### Components
- **Figma: tab** → Header navigation
- **Figma: logo** → Logo component in header
- **Figma: button** → `.btn-primary` CSS class
- **Figma: chip** → `.tag` CSS class
- **Figma: arrow** → `.arrow-btn` component
- **Figma: footerList** → Footer navigation
- **Figma: textbox** → Form input
- **Figma: textarea** → Form textarea

### Responsive
- Desktop: 1920px width design
- Mobile: 390px width design
- Breakpoint: 768px

---

## 🚀 API Endpoints Summary

### Public Endpoints (No Auth Required)
```
POST   /api/auth/login
POST   /api/auth/signup
GET    /api/blogs/published
GET    /api/blogs/{id}
GET    /api/projects
GET    /api/projects/featured
GET    /api/projects/{id}
GET    /api/team-members/active
GET    /api/careers/active
GET    /api/careers/{id}
POST   /api/contacts
GET    /api/categories
```

### Admin Only Endpoints (Requires ROLE_ADMIN)
```
GET    /api/blogs (all, including unpublished)
POST   /api/blogs
PUT    /api/blogs/{id}
DELETE /api/blogs/{id}

POST   /api/projects
PUT    /api/projects/{id}
DELETE /api/projects/{id}

GET    /api/team-members
POST   /api/team-members
PUT    /api/team-members/{id}
DELETE /api/team-members/{id}

GET    /api/careers
POST   /api/careers
PUT    /api/careers/{id}
DELETE /api/careers/{id}

GET    /api/contacts
PUT    /api/contacts/{id}/status
DELETE /api/contacts/{id}

POST   /api/categories
PUT    /api/categories/{id}
DELETE /api/categories/{id}
```

---

## 🐳 Docker Services

### Services Overview
```yaml
db:          MySQL 8.0 database
backend:     Spring Boot API (Port 8080)
frontend:    Angular + Nginx (Port 80)
```

### Networks
- `blockchain-network`: Bridge network connecting all services

### Volumes
- `mysql_data`: Persistent MySQL data storage

---

## 📊 Database Tables

1. **users** - User accounts
2. **user_roles** - User role mappings
3. **blogs** - Blog posts
4. **projects** - Project showcase
5. **project_images** - Additional project images
6. **team_members** - Team member profiles
7. **careers** - Job openings
8. **contacts** - Contact form submissions
9. **categories** - Content categorization

---

## 🔧 Configuration Files

### Backend
- `application.properties` - Local development config
- `application-docker.properties` - Docker environment config
- `pom.xml` - Maven dependencies

### Frontend
- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript compiler options
- `package.json` - NPM dependencies
- `nginx.conf` - Nginx server configuration

### Docker
- `docker-compose.yml` - Service orchestration
- `backend/Dockerfile` - Backend image definition
- `frontend/Dockerfile` - Frontend image definition

---

## 🌐 Environment Variables

### Backend (application.properties)
```properties
server.port                    # API port (8080)
spring.datasource.url          # Database URL
spring.datasource.username     # Database user
spring.datasource.password     # Database password
app.jwt.secret                 # JWT signing key
app.jwt.expiration            # Token expiration time
app.cors.allowed-origins      # CORS allowed origins
```

### Frontend (environment.ts)
```typescript
production                     # Production flag
apiUrl                        # Backend API URL
```

---

## 📦 Dependencies

### Backend (Spring Boot)
- Spring Web
- Spring Data JPA
- Spring Security
- MySQL Driver
- JWT (jjwt)
- Lombok
- Validation
- Swagger/OpenAPI

### Frontend (Angular)
- @angular/core
- @angular/router
- @angular/forms
- @angular/common
- RxJS

---

## 🧪 Testing Strategy

### Backend Tests
- Unit tests for Services
- Integration tests for Controllers
- Security tests for Authentication

### Frontend Tests
- Component tests
- Service tests
- E2E tests

---

## 📈 Scalability Considerations

1. **Horizontal Scaling** - Multiple backend instances behind load balancer
2. **Database Optimization** - Proper indexing, query optimization
3. **Caching** - Redis for frequently accessed data
4. **CDN** - Static assets delivery
5. **Load Balancer** - Nginx/HAProxy

---

## 🔐 Security Best Practices

1. ✅ Password hashing with BCrypt
2. ✅ JWT token-based authentication
3. ✅ Role-based access control
4. ✅ CORS configuration
5. ✅ SQL Injection protection (JPA)
6. ✅ XSS protection (Angular sanitization)
7. ✅ HTTPS ready
8. ✅ Environment-based configuration

---

## 🚀 Deployment Options

1. **Docker Compose** - Single server deployment
2. **Kubernetes** - Multi-server orchestration
3. **Cloud Platforms**:
   - AWS (ECS, EKS, RDS)
   - Google Cloud (GKE, Cloud SQL)
   - Azure (AKS, Azure Database)
4. **VPS** - Traditional server deployment

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [Docker Documentation](https://docs.docker.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Happy Development! 🎉**

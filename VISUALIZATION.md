# 📊 VISUALIZATION - Kiến trúc hệ thống

## 🏗️ Kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────────┐
│                        🌐 User Browser                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    🐳 Docker Compose                         │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Frontend   │    │   Backend    │    │   Database   │  │
│  │              │    │              │    │              │  │
│  │   Angular    │◄──►│ Spring Boot  │◄──►│    MySQL     │  │
│  │   + Nginx    │    │   + JWT      │    │     8.0      │  │
│  │              │    │              │    │              │  │
│  │   Port 80    │    │  Port 8080   │    │  Port 3306   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                              │
│  Network: blockchain-network (Bridge)                       │
│  Volume: mysql_data (Persistent Storage)                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

### Public User Request Flow

```
👤 User
  │
  │ 1. Access http://localhost
  ▼
┌──────────────┐
│   Nginx      │ 2. Serve Angular SPA
│  (Frontend)  │
└──────┬───────┘
       │
       │ 3. User clicks "View Blogs"
       ▼
┌──────────────┐
│   Angular    │ 4. HTTP GET /api/blogs/published
│  Component   │
└──────┬───────┘
       │
       │ 5. Request with Auth Interceptor
       ▼
┌──────────────┐
│ Spring Boot  │ 6. No JWT needed (public endpoint)
│  Controller  │
└──────┬───────┘
       │
       │ 7. Call Service
       ▼
┌──────────────┐
│   Service    │ 8. Business Logic
└──────┬───────┘
       │
       │ 9. Query Database
       ▼
┌──────────────┐
│  Repository  │ 10. JPA Query
└──────┬───────┘
       │
       │ 11. Execute SQL
       ▼
┌──────────────┐
│    MySQL     │ 12. Return Data
│   Database   │
└──────────────┘
       │
       │ 13. Data flows back up
       │
       ▼
👤 User sees blog list
```

### Admin Request Flow (Protected)

```
👤 Admin User
  │
  │ 1. Login with credentials
  ▼
┌──────────────┐
│ AuthService  │ 2. POST /api/auth/login
└──────┬───────┘
       │
       │ 3. Validate credentials
       ▼
┌──────────────┐
│   Backend    │ 4. Generate JWT Token
│ AuthController│
└──────┬───────┘
       │
       │ 5. Return JWT Token
       ▼
┌──────────────┐
│  Frontend    │ 6. Store token in localStorage
│  (Angular)   │
└──────┬───────┘
       │
       │ 7. Navigate to /admin
       ▼
┌──────────────┐
│ Admin Guard  │ 8. Check if user has ADMIN role
└──────┬───────┘
       │
       │ 9. Allowed ✅
       ▼
┌──────────────┐
│ Admin Panel  │ 10. Load admin dashboard
└──────┬───────┘
       │
       │ 11. User clicks "Add Blog"
       ▼
┌──────────────┐
│ Blog Form    │ 12. Fill form & submit
└──────┬───────┘
       │
       │ 13. POST /api/blogs with JWT
       ▼
┌──────────────┐
│Auth Interceptor│ 14. Add "Authorization: Bearer {token}"
└──────┬───────┘
       │
       │ 15. Request to backend
       ▼
┌──────────────┐
│ JWT Filter   │ 16. Validate token
└──────┬───────┘
       │
       │ 17. Token valid ✅
       ▼
┌──────────────┐
│@PreAuthorize │ 18. Check ROLE_ADMIN
│"hasRole..."  │
└──────┬───────┘
       │
       │ 19. Authorized ✅
       ▼
┌──────────────┐
│BlogController│ 20. Create blog
└──────┬───────┘
       │
       │ 21. Save to database
       ▼
┌──────────────┐
│    MySQL     │ 22. INSERT INTO blogs
└──────────────┘
       │
       │ 23. Return saved blog
       │
       ▼
👤 Admin sees success message
```

---

## 🗄️ Database Schema Visualization

```
┌─────────────┐         ┌──────────────┐
│    users    │         │  user_roles  │
├─────────────┤         ├──────────────┤
│ id (PK)     │◄────────│ user_id (FK) │
│ username    │         │ role         │
│ email       │         └──────────────┘
│ password    │
│ full_name   │         ┌──────────────┐
│ phone       │         │   blogs      │
│ active      │         ├──────────────┤
│ created_at  │         │ id (PK)      │
│ updated_at  │         │ title        │
└─────────────┘         │ summary      │
       │                │ content      │
       │                │ image_url    │
       │                │ author       │
       │ created_by     │ category_id ─┼─┐
       └────────────────┤ user_id (FK) │ │
                        │ published    │ │
                        │ view_count   │ │
                        │ created_at   │ │
                        │ updated_at   │ │
                        └──────────────┘ │
                                         │
        ┌────────────────────────────────┘
        │
        │              ┌──────────────┐
        │              │ categories   │
        │              ├──────────────┤
        │              │ id (PK)      │
        │              │ name         │
        └─────────────►│ slug         │
                       │ description  │
        ┌──────────────┤ type         │
        │              │ created_at   │
        │              │ updated_at   │
        │              └──────────────┘
        │
        │              ┌──────────────┐
        │              │  projects    │
        │              ├──────────────┤
        │              │ id (PK)      │
        │              │ title        │
        │              │ description  │
        │              │ detail_content│
        │              │ image_url    │
        │              │ category_id ─┼─┘
        │              │ client_name  │
        │              │ project_url  │
        │              │ featured     │
        │              │ created_at   │
        │              │ updated_at   │
        │              └──────┬───────┘
        │                     │
        │                     │ project_id
        │                     ▼
        │              ┌──────────────┐
        │              │project_images│
        │              ├──────────────┤
        │              │ project_id(FK)│
        │              │ image_url    │
        │              └──────────────┘

┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│team_members  │    │   careers    │    │  contacts    │
├──────────────┤    ├──────────────┤    ├──────────────┤
│ id (PK)      │    │ id (PK)      │    │ id (PK)      │
│ full_name    │    │ title        │    │ name         │
│ position     │    │ description  │    │ email        │
│ bio          │    │ requirements │    │ subject      │
│ image_url    │    │responsibilities│  │ message      │
│ email        │    │ job_type     │    │ status       │
│ linkedin     │    │ work_location│    │ created_at   │
│ twitter      │    │ location     │    └──────────────┘
│ display_order│    │ salary_range │
│ active       │    │ active       │
│ created_at   │    │ created_at   │
│ updated_at   │    │ updated_at   │
└──────────────┘    └──────────────┘
```

---

## 🎨 Frontend Component Tree

```
AppComponent
│
├── RouterOutlet
    │
    ├── HomeComponent
    │   ├── HeaderComponent
    │   ├── Hero Section
    │   ├── Features Grid
    │   ├── Values Section
    │   ├── Partners Scroll
    │   ├── Photo Grid
    │   ├── CTA Section
    │   └── FooterComponent
    │
    ├── AboutComponent
    │   ├── HeaderComponent
    │   ├── Hero Section
    │   ├── Office Photos
    │   ├── Team Grid
    │   ├── CTA Section
    │   └── FooterComponent
    │
    ├── ProjectsComponent
    │   ├── HeaderComponent
    │   ├── Hero Section
    │   ├── Projects Grid
    │   ├── CTA Section
    │   └── FooterComponent
    │
    ├── BlogComponent
    │   ├── HeaderComponent
    │   ├── Hero Section
    │   ├── Blog Grid
    │   ├── CTA Section
    │   └── FooterComponent
    │
    ├── BlogDetailComponent
    │   ├── HeaderComponent
    │   ├── Article Header
    │   ├── Article Image
    │   ├── Article Content
    │   ├── Article Footer
    │   └── FooterComponent
    │
    ├── CareersComponent
    │   ├── HeaderComponent
    │   ├── Hero Section
    │   ├── Careers List
    │   ├── CTA Section
    │   └── FooterComponent
    │
    ├── ContactComponent
    │   ├── HeaderComponent
    │   ├── Hero Section
    │   ├── Contact Form
    │   └── FooterComponent
    │
    ├── LoginComponent
    │   └── Login Form
    │
    ├── SignupComponent
    │   └── Signup Form
    │
    └── AdminComponent
        ├── Sidebar Navigation
        └── RouterOutlet (Admin Routes)
            │
            ├── DashboardComponent
            │   └── Stats Grid
            │
            ├── BlogManagementComponent
            │   ├── Blog List Table
            │   └── Blog Edit Form
            │
            ├── ProjectManagementComponent
            │   ├── Project List Table
            │   └── Project Edit Form
            │
            ├── TeamManagementComponent
            │   ├── Team List Table
            │   └── Team Edit Form
            │
            ├── CareerManagementComponent
            │   ├── Career List Table
            │   └── Career Edit Form
            │
            └── ContactManagementComponent
                ├── Contact List Table
                └── Contact Detail Modal
```

---

## 🔐 Security Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Architecture                     │
└─────────────────────────────────────────────────────────────┘

User Login
    │
    ▼
POST /auth/login
    │
    ▼
┌─────────────────┐
│ AuthController  │ Validate credentials
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│UserDetailsService│ Load user from DB
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│PasswordEncoder │ Compare BCrypt hash
└────────┬────────┘
         │
         ▼ ✅ Valid
┌─────────────────┐
│    JwtUtils     │ Generate JWT Token
└────────┬────────┘
         │
         ▼
    Return Token
         │
         ▼
┌─────────────────┐
│   Frontend      │ Store in localStorage
└─────────────────┘

─────────────────────────────────────

Subsequent Requests
    │
    ▼
HTTP Request + JWT in Header
    │
    ▼
┌─────────────────┐
│ AuthTokenFilter │ Extract & validate token
└────────┬────────┘
         │
         ▼ ✅ Valid
┌─────────────────┐
│Security Context │ Set Authentication
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  @PreAuthorize  │ Check role
└────────┬────────┘
         │
         ▼ ✅ Authorized
    Process Request
```

---

## 📱 Responsive Design Breakpoints

```
┌────────────────────────────────────────────────┐
│             Desktop (1920px+)                   │
│  ┌──────────────────────────────────────────┐  │
│  │  Header: Full navigation + Logo + User  │  │
│  ├──────────────────────────────────────────┤  │
│  │                                          │  │
│  │  Content: Multi-column grid layouts     │  │
│  │           Large typography                │  │
│  │           Hover effects enabled          │  │
│  │                                          │  │
│  ├──────────────────────────────────────────┤  │
│  │  Footer: Multi-column, full links       │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘

┌────────────────────────────────────┐
│      Tablet (768px - 1024px)       │
│  ┌────────────────────────────┐   │
│  │  Header: Collapsed menu    │   │
│  ├────────────────────────────┤   │
│  │                            │   │
│  │  Content: 2-column grids   │   │
│  │           Adapted spacing   │   │
│  │                            │   │
│  ├────────────────────────────┤   │
│  │  Footer: 2 columns         │   │
│  └────────────────────────────┘   │
└────────────────────────────────────┘

┌──────────────────┐
│ Mobile (<768px)  │
│  ┌────────────┐  │
│  │Header:Menu │  │
│  ├────────────┤  │
│  │            │  │
│  │  Content:  │  │
│  │  Single    │  │
│  │  Column    │  │
│  │            │  │
│  ├────────────┤  │
│  │Footer:Stack│  │
│  └────────────┘  │
└──────────────────┘
```

---

## 🎨 Color System

```
Primary Colors:
┌────────┐ #0014F4 - Primary Blue
│ ██████ │ Used for: Buttons, Links, Highlights
└────────┘

┌────────┐ #FF3FDB - Secondary Pink
│ ██████ │ Used for: Accents, Gradients
└────────┘

Background Colors:
┌────────┐ #17181D - Dark Background
│ ██████ │ Used for: Main background
└────────┘

┌────────┐ #23252C - Darker Shade
│ ██████ │ Used for: Cards, sections
└────────┘

Text Colors:
┌────────┐ #FFFFFF - White
│ ██████ │ Used for: Primary text
└────────┘

┌────────┐ #D9D9D9 - Light Gray
│ ██████ │ Used for: Secondary text
└────────┘

Border Colors:
┌────────┐ #383A41 - Border Gray
│ ██████ │ Used for: Borders, dividers
└────────┘

Gradients:
┌────────────────────────────┐
│ ████████████████████████ │ Blue → Pink
│ #0014F4 ────► #FF3FDB     │
└────────────────────────────┘
```

---

## 📊 Admin Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│  Sidebar        │  Main Content Area                    │
│  Navigation     │                                       │
├─────────────────┼───────────────────────────────────────┤
│                 │                                       │
│ 📊 Dashboard    │  ┌─────────────────────────────────┐ │
│ 📝 Blogs        │  │     DASHBOARD STATISTICS         │ │
│ 🚀 Projects     │  ├─────────┬─────────┬─────────────┤ │
│ 👥 Team         │  │  📝 50  │  🚀 25  │  👥 12      │ │
│ 💼 Careers      │  │  Blogs  │Projects │ Members     │ │
│ 📧 Contacts     │  ├─────────┼─────────┼─────────────┤ │
│                 │  │  💼 8   │  📧 45  │             │ │
│ 🏠 Back Home    │  │Careers  │Contacts │             │ │
│ 🚪 Logout       │  └─────────┴─────────┴─────────────┘ │
│                 │                                       │
│                 │  ┌─────────────────────────────────┐ │
│                 │  │     QUICK ACTIONS               │ │
│                 │  ├─────────────────────────────────┤ │
│                 │  │  [➕ Add Blog]  [➕ Add Project]│ │
│                 │  │  [➕ Add Team]  [➕ Add Career] │ │
│                 │  └─────────────────────────────────┘ │
│                 │                                       │
└─────────────────┴───────────────────────────────────────┘

When "Blogs" clicked:
┌─────────────────────────────────────────────────────────┐
│                 │  [➕ Add New Blog]                    │
│                 ├───────────────────────────────────────┤
│                 │  BLOG MANAGEMENT TABLE                │
│                 ├───┬──────┬──────┬───────┬──────┬─────┤
│                 │ID │Title │Author│Published│Views│Actions│
│                 ├───┼──────┼──────┼───────┼──────┼─────┤
│                 │1  │Blog 1│John  │  ✓    │ 150  │✏️ 🗑️│
│                 │2  │Blog 2│Alice │  ✗    │  50  │✏️ 🗑️│
│                 └───┴──────┴──────┴───────┴──────┴─────┘

When "✏️ Edit" clicked:
┌─────────────────────────────────────────────────────────┐
│                 │  EDIT BLOG                            │
│                 ├───────────────────────────────────────┤
│                 │  Title: [________________]            │
│                 │  Author: [________________]           │
│                 │  Image URL: [________________]        │
│                 │  Summary: [________________]          │
│                 │  Content: [                ]          │
│                 │           [                ]          │
│                 │  ☑️ Published                         │
│                 │                                       │
│                 │  [💾 Save]  [❌ Cancel]              │
│                 └───────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

```
┌──────────┐
│   User   │
└────┬─────┘
     │
     │ Interaction
     ▼
┌──────────┐
│ Angular  │ ◄─── Route Guards (auth, admin)
│Component │
└────┬─────┘
     │
     │ Call Service
     ▼
┌──────────┐
│ Angular  │ ◄─── HTTP Interceptor (add JWT)
│ Service  │
└────┬─────┘
     │
     │ HTTP Request
     ▼
┌──────────┐
│  Spring  │ ◄─── JWT Filter (validate token)
│Controller│ ◄─── @PreAuthorize (check role)
└────┬─────┘
     │
     │ Call Service
     ▼
┌──────────┐
│  Spring  │
│ Service  │ Business Logic
└────┬─────┘
     │
     │ Repository call
     ▼
┌──────────┐
│   JPA    │
│Repository│
└────┬─────┘
     │
     │ SQL Query
     ▼
┌──────────┐
│  MySQL   │
│ Database │
└──────────┘
     │
     │ Data flows back
     ▼
   Response to User
```

---

## 📦 Deployment Workflow

```
Development
    │
    ├─ Backend: ./mvnw spring-boot:run
    └─ Frontend: npm start
    
    ▼ Build
    
Docker Images
    │
    ├─ Backend: maven:3.9 → eclipse-temurin:17
    └─ Frontend: node:20 → nginx:alpine
    
    ▼ Compose
    
Docker Compose
    │
    ├─ Service: db (MySQL)
    ├─ Service: backend (Spring Boot)
    └─ Service: frontend (Angular + Nginx)
    
    ▼ Network
    
blockchain-network
    │
    ├─ db:3306
    ├─ backend:8080
    └─ frontend:80
    
    ▼ Access
    
http://localhost ────► Frontend ────► Backend ────► Database
```

---

## 🎯 Feature Modules

```
📝 Blog Module
   ├── Blog List (Public)
   ├── Blog Detail (Public)
   ├── Blog Search (Public)
   └── Blog CRUD (Admin)

🚀 Project Module
   ├── Project List (Public)
   ├── Featured Projects (Public)
   ├── Project Detail (Public)
   └── Project CRUD (Admin)

👥 Team Module
   ├── Active Members (Public)
   └── Member CRUD (Admin)

💼 Career Module
   ├── Active Careers (Public)
   ├── Career Detail (Public)
   └── Career CRUD (Admin)

📧 Contact Module
   ├── Submit Form (Public)
   └── Manage Contacts (Admin)

📂 Category Module
   ├── List Categories (Public)
   └── Category CRUD (Admin)

🔐 Auth Module
   ├── Login (Public)
   ├── Signup (Public)
   └── Logout (Authenticated)
```

---

## 📈 Performance Metrics

### Expected Performance

```
Page Load Time:
  Home:          < 2s
  Blog List:     < 1.5s
  Admin Panel:   < 2s

API Response Time:
  GET requests:  < 200ms
  POST requests: < 500ms
  
Database Queries:
  Simple SELECT: < 50ms
  Complex JOIN:  < 200ms

Concurrent Users:
  Small setup:   100 users
  With scaling:  1000+ users
```

---

## 🎨 Design Tokens

```css
/* Typography Scale */
Font Sizes:
  12px - Small tags
  14px - Form labels
  16px - Body text
  18px - Large body
  24px - Subheadings
  28px - Card titles
  32px - Section titles
  48px - Page subtitles
  64px - Hero subtitles
  128px - Hero main titles

/* Spacing Scale */
  4px  - xs
  8px  - sm
  16px - md
  24px - lg
  32px - xl
  48px - 2xl
  64px - 3xl
  120px - Section gap

/* Border Radius */
  4px  - Small elements
  8px  - Cards
  12px - Large cards
  65px - Pills/Buttons
  50%  - Circles
```

---

## 🚀 Ready to Launch!

```
     🎉 PROJECT COMPLETE! 🎉

┌─────────────────────────────────────┐
│  All Features Implemented: ✅       │
│  Documentation Complete: ✅         │
│  Docker Ready: ✅                   │
│  Security Configured: ✅            │
│  Production Ready: ✅               │
└─────────────────────────────────────┘

Next Step: ./START.sh

Access:
  🌐 http://localhost
  🔧 http://localhost:8080/api/swagger-ui.html

Login → Admin Panel → Add Content → Go Live!
```

---

**Chúc bạn thành công! 🚀✨**

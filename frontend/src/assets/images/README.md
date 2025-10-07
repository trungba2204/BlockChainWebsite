# 🖼️ Assets Guide

## Cách thêm hình ảnh vào project

### 1. Logo
Thay thế logo trong các file sau:
- `header.component.html` - Update SVG code
- `footer.component.html` - Update SVG code

Hoặc sử dụng file image:
```html
<img src="assets/images/logo.png" alt="Logo" />
```

### 2. Hình ảnh cho các trang

#### Home Page
- `security-icon.png` - Security icon
- `blockchain-icon.png` - Blockchain icon  
- `diversity.svg` - Diversity illustration
- `target.png` - Target icon
- `puzzle.png` - Puzzle image
- `3d-shapes.png` - 3D shapes decoration
- `team-1.jpg` đến `team-6.jpg` - Team photos

#### About Page
- `office-1.jpg` đến `office-3.jpg` - Office photos
- `default-avatar.jpg` - Default team member avatar

#### Projects Page
- `default-project.jpg` - Default project image

#### Blog Page
- `default-blog.jpg` - Default blog image

### 3. Tối ưu hình ảnh

**Khuyến nghị:**
- Format: WebP (nén tốt nhất)
- Fallback: JPG/PNG
- Team photos: 400x400px
- Project images: 960x720px
- Blog images: 960x540px
- Office photos: 800x600px

**Tools:**
- [TinyPNG](https://tinypng.com/) - Nén ảnh
- [Squoosh](https://squoosh.app/) - Convert to WebP
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Optimize SVG

### 4. Sử dụng trong code

**TypeScript:**
```typescript
export class MyComponent {
  imageUrl = 'assets/images/my-image.jpg';
}
```

**HTML:**
```html
<img [src]="imageUrl" alt="Description" />
```

**CSS:**
```css
.hero {
  background-image: url('/assets/images/bg.jpg');
}
```

### 5. Upload từ Admin Panel

Để enable upload từ admin panel:

1. Install ngx-file-upload hoặc tương tự
2. Implement file upload API trong backend
3. Store files trong `backend/uploads/` hoặc cloud storage (AWS S3)

**Backend upload endpoint:**
```java
@PostMapping("/upload")
public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
    // Save file logic
    String fileUrl = fileStorageService.store(file);
    return ResponseEntity.ok(fileUrl);
}
```

---

## 📂 Cấu trúc thư mục assets đề xuất

```
frontend/src/assets/
├── images/
│   ├── logo/
│   │   ├── logo.svg
│   │   ├── logo-white.svg
│   │   └── logo-icon.svg
│   ├── home/
│   │   ├── hero-bg.jpg
│   │   ├── security-icon.png
│   │   └── ...
│   ├── team/
│   │   ├── member-1.jpg
│   │   └── ...
│   ├── projects/
│   │   ├── project-1.jpg
│   │   └── ...
│   ├── blog/
│   │   ├── blog-1.jpg
│   │   └── ...
│   └── icons/
│       ├── facebook.svg
│       ├── twitter.svg
│       └── linkedin.svg
├── fonts/
│   ├── Outfit/
│   └── Satoshi/
└── data/
    └── sample-content.json
```

---

## 🎨 Icon Resources

### Free Icon Libraries:
- [Heroicons](https://heroicons.com/)
- [Font Awesome](https://fontawesome.com/)
- [Material Icons](https://fonts.google.com/icons)
- [Feather Icons](https://feathericons.com/)

### Custom Icons:
Tạo SVG icons tại [Figma](https://figma.com) và export

---

## 📝 Notes

- Tất cả paths đều relative từ `src/`
- Images phải nằm trong `assets/` folder
- SVGs nên được inline trong HTML cho performance
- Sử dụng lazy loading cho images lớn
- Add alt text cho accessibility

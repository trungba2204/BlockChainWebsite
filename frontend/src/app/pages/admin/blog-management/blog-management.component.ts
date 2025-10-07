import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../models/blog.model';

@Component({
  selector: 'app-blog-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {
  blogs: Blog[] = [];
  selectedBlog?: Blog;
  isEditing = false;
  loading = false;

  newBlog: Blog = {
    title: '',
    summary: '',
    content: '',
    imageUrl: '',
    author: '',
    published: false
  };

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.loading = true;
    this.blogService.getAllBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  openCreateForm(): void {
    this.isEditing = true;
    this.selectedBlog = undefined;
    this.newBlog = {
      title: '',
      summary: '',
      content: '',
      imageUrl: '',
      author: '',
      published: false
    };
  }

  editBlog(blog: Blog): void {
    this.isEditing = true;
    this.selectedBlog = blog;
    this.newBlog = { ...blog };
  }

  saveBlog(): void {
    this.loading = true;

    if (this.selectedBlog?.id) {
      // Update existing
      this.blogService.updateBlog(this.selectedBlog.id, this.newBlog).subscribe({
        next: () => {
          this.loadBlogs();
          this.cancelEdit();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      // Create new
      this.blogService.createBlog(this.newBlog).subscribe({
        next: () => {
          this.loadBlogs();
          this.cancelEdit();
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
    }
  }

  deleteBlog(id: number): void {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(id).subscribe({
        next: () => this.loadBlogs(),
        error: (err) => console.error(err)
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.selectedBlog = undefined;
    this.loading = false;
  }
}

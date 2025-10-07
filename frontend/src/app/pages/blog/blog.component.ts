import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];
  loading = false;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.loading = true;
    this.blogService.getPublishedBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading blogs:', err);
        this.loading = false;
      }
    });
  }
}

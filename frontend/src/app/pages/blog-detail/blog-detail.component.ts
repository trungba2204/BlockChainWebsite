import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog?: Blog;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadBlog(id);
  }

  loadBlog(id: number): void {
    this.loading = true;
    this.blogService.getBlogById(id).subscribe({
      next: (data) => {
        this.blog = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading blog:', err);
        this.loading = false;
      }
    });
  }
}

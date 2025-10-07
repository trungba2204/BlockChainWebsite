import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog.model';

const API_URL = 'http://localhost:8080/api/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getPublishedBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${API_URL}/published`);
  }

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(API_URL);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${API_URL}/${id}`);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(API_URL, blog);
  }

  updateBlog(id: number, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${API_URL}/${id}`, blog);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

  searchBlogs(keyword: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${API_URL}/search?keyword=${keyword}`);
  }
}

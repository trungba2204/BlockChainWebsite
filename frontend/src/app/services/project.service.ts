import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

const API_URL = 'http://localhost:8080/api/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(API_URL);
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${API_URL}/featured`);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${API_URL}/${id}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(API_URL, project);
  }

  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${API_URL}/${id}`, project);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}

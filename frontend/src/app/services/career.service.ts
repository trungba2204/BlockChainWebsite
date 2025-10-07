import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Career } from '../models/career.model';

const API_URL = 'http://localhost:8080/api/careers';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient) { }

  getActiveCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(`${API_URL}/active`);
  }

  getAllCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(API_URL);
  }

  getCareerById(id: number): Observable<Career> {
    return this.http.get<Career>(`${API_URL}/${id}`);
  }

  createCareer(career: Career): Observable<Career> {
    return this.http.post<Career>(API_URL, career);
  }

  updateCareer(id: number, career: Career): Observable<Career> {
    return this.http.put<Career>(`${API_URL}/${id}`, career);
  }

  deleteCareer(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TeamMember } from '../models/team-member.model';

const API_URL = 'http://localhost:8080/api/team-members';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  constructor(private http: HttpClient) { }

  getActiveTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${API_URL}/active`);
  }

  getAllTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(API_URL);
  }

  getTeamMemberById(id: number): Observable<TeamMember> {
    return this.http.get<TeamMember>(`${API_URL}/${id}`);
  }

  createTeamMember(member: TeamMember): Observable<TeamMember> {
    return this.http.post<TeamMember>(API_URL, member);
  }

  updateTeamMember(id: number, member: TeamMember): Observable<TeamMember> {
    return this.http.put<TeamMember>(`${API_URL}/${id}`, member);
  }

  deleteTeamMember(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { AuthService } from './auth-service';
import { PagedRequest, PagedResponse } from '@/models/dto/PaginationDto';
import { UserCreateDto, UserDto, UserUpdateDto } from '@/models/dto/UserDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly BASE_API_URL = environment.apiBaseUrl;
  private readonly USER_API = `${this.BASE_API_URL}/user`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAll(request: PagedRequest): Observable<PagedResponse<UserDto>> {
    const headers = this.getAuthHeaders();

    let params = new HttpParams();
    Object.entries(request).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        params = params.set(key, value.toString());
      }
    });

    return this.http.get<PagedResponse<UserDto>>(this.USER_API, {
      headers,
      params
    });
  }

  getById(id: number): Observable<UserDto> {
    const headers = this.getAuthHeaders();
    return this.http.get<UserDto>(`${this.USER_API}/${id}`, { headers });
  }

  create(payload: UserCreateDto): Observable<UserDto> {
    const headers = this.getAuthHeaders();
    return this.http.post<UserDto>(this.USER_API, payload, { headers });
  }

  update(id: number, payload: UserUpdateDto): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.put<void>(`${this.USER_API}/${id}`, payload, { headers });
  }

  delete(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.USER_API}/${id}`, { headers });
  }
}

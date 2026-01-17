import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { AuthService } from './auth-service';
import { UserImportResult } from '@/models/interfaces/user-import.model';

@Injectable({
  providedIn: 'root',
})
export class UserImportService {

  private readonly BASE_API_URL = environment.apiBaseUrl;
  private readonly IMPORT_API = `${this.BASE_API_URL}/import/import`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  importUsers(file: File): Observable<UserImportResult> {
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UserImportResult>(this.IMPORT_API, formData, { headers });
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { AuthService } from './auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuDTO } from '@/models/dto/MenuDTO';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly BASE_API_URL = environment.apiBaseUrl;
  private readonly MENU_API = `${this.BASE_API_URL}/menu`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllMenus(): Observable<MenuDTO[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<MenuDTO[]>(this.MENU_API, { headers });
  }
}

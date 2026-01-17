import { EnumDropdown } from '@/models/interfaces/EnumDropdown';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';


@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private readonly BASE_API_URL = environment.apiBaseUrl;
  private readonly MENU_API = `${this.BASE_API_URL}/common`;

  constructor(private http: HttpClient) {}

  getUserRoles(): Observable<EnumDropdown[]>{
    return this.http.get<EnumDropdown[]>(this.MENU_API + '/user-roles');
  }
}
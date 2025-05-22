import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from '../models/role.model';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  GetRoles(): Observable<Roles[]>{
  
    return this.http.get<Array<Roles>>("https://localhost:7290/Role/GetRoles");
  }
}


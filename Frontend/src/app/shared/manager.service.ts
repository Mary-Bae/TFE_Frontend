import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from './manager.model';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  GetMailManagerByUser(): Observable<Manager>{
  
    return this.http.get<Manager>("https://localhost:7290/Manager/GetMailManagerByUser");
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe, EmployeNoms } from '../models/employe.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  constructor(private http: HttpClient) { }

  GetMailManagerByUser(): Observable<Employe>{
    return this.http.get<Employe>("https://localhost:7290/Employe/GetMailManagerByUser");
  }
  GetMailByDemande(demandeId: number): Observable<Employe>{
    return this.http.get<Employe>("https://localhost:7290/Employe/GetMailByDemande?demId=" + demandeId);
  }

  GetUsers(): Observable<Employe>{
    return this.http.get<Employe>("https://localhost:7290/Employe/GetUsers");
  }
  CreerEmploye(employe: Employe){
  return this.http.post("https://localhost:7290/Employe/CreateUser", employe)
}

  GetManagers(): Observable<EmployeNoms[]>{
    return this.http.get<Array<EmployeNoms>>("https://localhost:7290/Employe/GetManagers");
  }
   updateEmploye(id: number, employe: Employe) {
      return this.http.put("https://localhost:7290/Employe/UpdateEmploye?id=" +id, employe);
    }
    GetEmployeById(id: number){
      return this.http.get<Employe>("https://localhost:7290/Employe/GetEmployeById?id=" + id);
    }
    GetActiveUser(){
      return this.http.get<Employe>("https://localhost:7290/Employe/ActiveUser");
    }
      DelEmploye(id: number, employe: Employe)
      { 
        return this.http.put<Employe>("https://localhost:7290/Employe/DelEmploye?id=" + id, employe);
      }
}
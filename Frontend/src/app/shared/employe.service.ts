import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe } from './employe.model';


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
      console.log('Envoi de la requête POST au backend :', employe);
  return this.http.post("https://localhost:7290/Employe/CreateUser", employe)
}
}
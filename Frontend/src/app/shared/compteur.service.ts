import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compteur } from '../shared/compteur.model';


@Injectable({
  providedIn: 'root'
})
export class CompteurService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  GetCompteurByUser(): Observable<Compteur[]>{
  
    return this.http.get<Array<Compteur>>("https://localhost:7290/Compteur/GetCompteurByUser");
  }
}
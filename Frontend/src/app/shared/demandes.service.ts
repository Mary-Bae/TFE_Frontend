import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demandes } from '../shared/demandes.model';
import { TypeAbsence } from '../shared/TypeAbsence.model';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  constructor(private http: HttpClient, private auth: AuthService) { }

Get(){
  return this.http.get<Array<Demandes>>("https://localhost:7290/Demandes/GetDemandes");
}
GetById(id: Int32Array){
  return this.http.get<Demandes>("https://localhost:7290/Demandes/GetDemandeById?id=" + id);
}
GetTypeAbsByUser(): Observable<TypeAbsence[]>{

  return this.http.get<Array<TypeAbsence>>("https://localhost:7290/Demandes/GetTypeAbsByUser");
}
GetDemandesByUser(): Observable<Demandes[]>{

  return this.http.get<Array<Demandes>>("https://localhost:7290/Demandes/GetDemandesByUser");
}
  Post(demande: Demandes){
return this.http.post("https://localhost:7290/Demandes/AddDemande", demande)
  .subscribe(
    response => console.log(response),
    error => console.error(error)
  );
  }
}

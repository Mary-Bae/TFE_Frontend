import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demandes } from '../shared/demandes.model';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {
Get(){
  return this.http.get<Array<Demandes>>("https://localhost:7290/Demandes/GetDemandes");
}
GetById(id: Int32Array){
  return this.http.get<Demandes>("https://localhost:7290/Demandes/GetDemandeById?id=" + id);
}
  constructor(private http: HttpClient) { }
  Post(demande: Demandes){
return this.http.post("https://localhost:7290/Demandes/AddDemande", demande)
  .subscribe(
    response => console.log(response),
    error => console.error(error)
  );
  }
}

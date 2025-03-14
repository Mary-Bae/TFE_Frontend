import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandesModel } from './demandes.model';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  constructor(private http: HttpClient) { }
  Post(demande: DemandesModel){
return this.http.post("https://localhost:7290/Demandes/AddDemande", demande)
  .subscribe(
    response => console.log(response),
    error => console.error(error)
  );
  }
}

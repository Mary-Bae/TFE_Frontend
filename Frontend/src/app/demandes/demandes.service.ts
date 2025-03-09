import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demandes } from './demandes.model';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  constructor(private http: HttpClient) { }
  Post(demande: Demandes){
    return this.http.post("https://localhost:7290/api/Demandes", demande).subscribe();
  }
}

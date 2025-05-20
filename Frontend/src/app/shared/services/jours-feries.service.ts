import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JoursFeries } from '../models/jours-feries.model';


@Injectable({
  providedIn: 'root'
})
export class JoursFeriesService {

  constructor(private http: HttpClient) { }

  GetJoursFeries(): Observable<JoursFeries[]>{
  
    return this.http.get<Array<JoursFeries>>("https://localhost:7290/JoursFeries/GetJoursFeries");
  }
}


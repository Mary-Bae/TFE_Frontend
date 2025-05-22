import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { AddDemandes, DemandeById, Demandes } from '../models/demandes.model';
import { TypeAbsence } from '../models/type-absence.model';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  constructor(private http: HttpClient, private auth: AuthService) { }

GetDemandeById(id: number){
  return this.http.get<DemandeById>("https://localhost:7290/Demandes/GetDemandeById?id=" + id);
}
GetTypeAbsByUser(): Observable<TypeAbsence[]>{

  return this.http.get<Array<TypeAbsence>>("https://localhost:7290/Demandes/GetTypeAbsByUser");
}
GetDemandesByUser(): Observable<Demandes[]>{

  return this.http.get<Array<Demandes>>("https://localhost:7290/Demandes/GetDemandesByUser");
}
  PostDemande(addDemande: AddDemandes){
    console.log('Envoi de la requête POST au backend :', addDemande);
return this.http.post("https://localhost:7290/Demandes/AjoutDemandeAbsence", addDemande)
  
  }
  updateDemande(id: number, demande: AddDemandes) {
    return this.http.put("https://localhost:7290/Demandes/MajDemande?id=" +id, demande);
  }
  DeleteDemande(id: number)
  { 
    return this.http.delete<DemandeById>("https://localhost:7290/Demandes/DelDemande?id=" + id);
  }
  GetDemandesEquipe(): Observable<Demandes[]>{
    return this.http.get<Array<Demandes>>("https://localhost:7290/Demandes/GetDemandesEquipe");
  }
  updStatutDemande(id: number, statut: number) {
    return this.http.put("https://localhost:7290/Demandes/MajStatutDemande?pDemId=" +id + "&pStatut=" + statut, null);
  }
}


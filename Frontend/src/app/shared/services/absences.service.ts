import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Absence, TypeAbsence } from '../models/type-absence.model';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  constructor(private http: HttpClient) { }

      GetAbsences(): Observable<Absence[]>
      { 
        return this.http.get<Array<Absence>>("https://localhost:7290/Absences/GetAbsences");
      }
        GetAbsencesByEmploye(id: number): Observable<TypeAbsence[]>{
        return this.http.get<TypeAbsence[]>("https://localhost:7290/Absences/GetAbsencesByEmployeId?employeId=" + id);
      }
      AddAbsence(absence: TypeAbsence, id: number, jours: number){
        return this.http.post(`https://localhost:7290/Absences/AjoutAbsence?employeId=${id}&jours=${jours}`, absence);
      }
      UpdAbsence(absence: TypeAbsence, id: number, jours: number){
        console.log('📡 UPD ABSENCE envoyée :', absence, id, jours);
        return this.http.put(`https://localhost:7290/Absences/UpdateAbsence?employeId=${id}&jours=${jours}`, absence);
      }
      DeleteAbsence(id: number)
        { 
          return this.http.delete<TypeAbsence>("https://localhost:7290/Absences/DelAbsence?id=" + id);
        }
}
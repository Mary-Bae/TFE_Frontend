import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { EmployeService } from '../shared/services/employe.service';
import { AbsencesService } from '../shared/services/absences.service';
import { Employe } from '../shared/models/employe.model';
import { Absence, TypeAbsence } from '../shared/models/type-absence.model';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.css'
})
export class AbsencesComponent {
formAbs: FormGroup;
  employe: Employe = new Employe();
  absenceByEmploye: TypeAbsence[] = [];
  typesAbsence: Absence[] = [];
  nom: string = '';
  prenom: string = '';
  annee: number = new Date().getFullYear();
  choix: string = 'année';


 constructor(private employeService: EmployeService,private absencesService: AbsencesService, private router: Router, private route: ActivatedRoute, public auth : AuthService ){
  this.formAbs = new FormGroup({
  absence: new FormControl('', Validators.required),
  jours: new FormControl(0,Validators.pattern(/^\d+([,.]\d{1,2})?$/))
  });

    this.absencesService.GetAbsences().subscribe(abs => {
      this.typesAbsence = abs;
    });

    this.formAbs.get('absence')?.valueChanges.subscribe((val: number) => {
    const typeId = +val;
    this.choix = typeId === 2 ? 'semaine' : 'année';
    
  });


    this.route.params.subscribe(params=>{
      let id= params['id']
      if(id){
        this.employeService.GetEmployeById(id).subscribe(EmployeById=>{
          if(EmployeById){
            this.employe = EmployeById; //-> Récupération de l'id de de l'employe pour pouvoir faire l'update ensuite
            this.nom = EmployeById.EMP_Nom;
            this.prenom = EmployeById.EMP_Prenom;
          }
        })

        this.absencesService.GetAbsencesByEmploye(id).subscribe(absenceList => {
        this.absenceByEmploye = absenceList;
        });
      }
    })
  }

  Save(form: FormGroup){
    const typeId = +form.value.absence;
    const jours = +form.value.jours;

    const JoursRequis = [1,2, 3, 4, 5, 8]; //Pour obliger l'admin d'enregistrer un nombre de jours pour certaines absences

    if (JoursRequis.includes(typeId) && (!jours || jours === 0 )) {
    Swal.fire({ icon: 'warning', title: 'Veuillez indiquer un nombre de jours.' });
    return;
  }

      const absence = new TypeAbsence();
      absence.TAEM_TYPE_id = typeId;
      absence.TAEM_AnneeEffective = this.annee;
        
      // Vérifie si une absence du même type existe déjà
        const existe = this.absenceByEmploye.find(a => a.TAEM_TYPE_id === typeId);

      const operation = existe //Si elle existe on fait l'update, sinon on l'ajoute
      ? this.absencesService.UpdAbsence(absence, this.employe.EMP_id, jours)
      : this.absencesService.AddAbsence(absence, this.employe.EMP_id, jours);

    operation.subscribe({
    next: () => {
      Swal.fire({ icon: 'success', title: existe ? 'Absence modifiée avec succès !' : 'Absence ajoutée avec succès !' });
      this.formAbs.reset();
      this.absencesService.GetAbsencesByEmploye(this.employe.EMP_id).subscribe(data => {
        this.absenceByEmploye = data;
      });
    },
    error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur détectée !' ,
            text: err.error?.toString() || err.message,
            confirmButtonText: 'OK',
          });
        }
  });
}

delete(id: number) {
    if (confirm('Voulez-vous vraiment annuler cette absence ?')) {
      this.absencesService.DeleteAbsence(id).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Absence supprimée avec succès !',
            confirmButtonText: 'OK',
          });
          this.absencesService.GetAbsencesByEmploye(this.employe.EMP_id).subscribe(data => {
        this.absenceByEmploye = data;
      });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur dans la suppression de la demande !' ,
            text: err.error?.toString() || err.message,
            confirmButtonText: 'OK',
          });
        }
      });

}}}
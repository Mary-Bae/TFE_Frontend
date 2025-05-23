import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { EmployeService } from '../shared/services/employe.service';
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


 constructor(private employeService: EmployeService, private router: Router, private route: ActivatedRoute, public auth : AuthService ){
  this.formAbs = new FormGroup({
  nom: new FormControl('', Validators.required),
  prenom: new FormControl('', Validators.required),
  pren2: new FormControl(''),
  absence: new FormControl('', Validators.required)
});
    this.employeService.GetAbsences().subscribe(abs => {
      this.typesAbsence = abs;
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

        this.employeService.GetAbsencesByEmploye(id).subscribe(absenceList => {
        this.absenceByEmploye = absenceList;
        });
      }
    })
  }

  Save(form: FormGroup){
    this.employe.EMP_Nom = form.value.nom;
    this.employe.EMP_Prenom = form.value.prenom;
    
    // Vérifier si c'est une modification ou un ajout
    if (this.employe && this.employe.EMP_id) { // S'il y a DEM_id (récupéré dans GetDemandeById), on fait un update
      this.employeService.updateEmploye(this.employe.EMP_id, this.employe)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title:'Employé mise à jour avec succès!',
            confirmButtonText: 'OK',
          }).then(() => {  // Une fois que l'utilisateur a cliqué sur OK, je change de route
            
            this.router.navigate(['/utilisateurs']);
          });
        }, 
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title:'Erreur ! ',
            //text: err.error?.toString() || err.message,
            confirmButtonText: 'OK',
          })
        }
        });
  } else { // Sinon, on fait un ajout
      this.employeService.CreerEmploye(this.employe)
      .subscribe({
        next: () => {
        Swal.fire({
          icon: 'success',
          title:'Employe rajouté avec succès!',
          confirmButtonText: 'OK',
        }).then(() => {  // Une fois que l'utilisateur a cliqué sur OK, je vide la form pour entrer une autre demande
          this.formAbs.reset();
        });
      }, 
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de l\'ajout de l\'employé !',
          confirmButtonText: 'OK',
        })
      }
      });
  }
}

}
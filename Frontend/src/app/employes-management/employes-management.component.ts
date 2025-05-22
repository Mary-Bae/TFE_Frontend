import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { EmployeService } from '../shared/services/employe.service';
import { RoleService } from '../shared/services/role.service';
import { Employe } from '../shared/models/employe.model';
import { EmployeNoms } from '../shared/models/employe.model';
import { Roles } from '../shared/models/role.model';

@Component({
  selector: 'app-employes-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './employes-management.component.html',
  styleUrl: './employes-management.component.css'
})
export class EmployesManagementComponent {
  formAbs: FormGroup;
  employe: Employe = new Employe();
  titreForme: string = "";
  roles: Roles[] = [];
  managers:EmployeNoms[] = [];


 constructor(private employeService: EmployeService, private roleService: RoleService, private router: Router, private route: ActivatedRoute, public auth : AuthService ){
    this.formAbs= new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      pren2: new FormControl(''),
      sexe: new FormControl('', Validators.required),
      manager: new FormControl(null),
      role: new FormControl('', Validators.required)
    });
    this.roleService.GetRoles().subscribe(role => {
      this.roles = role;
    });
    this.employeService.GetManagers().subscribe(manager => {
      this.managers = manager;
    });


    this.route.params.subscribe(params=>{
      let id= params['id']
      if(id){
        this.titreForme = "Modification de votre demande"
        this.employeService.GetEmployeById(id).subscribe(EmployeById=>{
          if(EmployeById){
            this.employe = EmployeById; //-> Récupération de l'id de de l'employe pour pouvoir faire l'update ensuite
            this.formAbs.controls['nom'].setValue(EmployeById.EMP_Nom);
            this.formAbs.controls['prenom'].setValue(EmployeById.EMP_Prenom);
            this.formAbs.controls['pren2'].setValue(EmployeById.EMP_Pren2);
            this.formAbs.controls['sexe'].setValue(EmployeById.EMP_Sexe);
            this.formAbs.controls['manager'].setValue(EmployeById.EMP_Manager_id);
            this.formAbs.controls['role'].setValue(EmployeById.EMP_ROL_id);
          }
        })
      } else {
        this.titreForme = "Nouvel employé"; 
      }
    })
  }

  Save(form: FormGroup){
    this.employe.EMP_Nom = form.value.nom;
    this.employe.EMP_Prenom = form.value.prenom;
    this.employe.EMP_Pren2 = form.value.pren2;
    this.employe.EMP_Sexe = form.value.sexe;
    this.employe.EMP_ROL_id = form.value.role;
    this.employe.EMP_Manager_id = form.value.manager;
    
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


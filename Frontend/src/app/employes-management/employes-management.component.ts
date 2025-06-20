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
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employes-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbDatepickerModule],
  templateUrl: './employes-management.component.html',
  styleUrl: './employes-management.component.css'
})
export class EmployesManagementComponent {
  formAbs: FormGroup;
  employe: Employe = new Employe();
  titreForme: string = "";
  roles: Roles[] = [];
  managers:EmployeNoms[] = [];
  isModification: boolean = false;
   nouveauContrat: boolean = false;

 constructor(private employeService: EmployeService, private roleService: RoleService, private router: Router, private route: ActivatedRoute, public auth : AuthService ){
    this.formAbs= new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      pren2: new FormControl(''),
      sexe: new FormControl('', Validators.required),
      manager: new FormControl(null),
      role: new FormControl('', Validators.required),
      typeContrat: new FormControl('', Validators.required),
      joursSemaine: new FormControl('', [Validators.required,Validators.pattern('^[1-5]$')]),
      description: new FormControl(''),
      dateBegin: new FormControl(''),
      dateEnd: new FormControl(null),
      contratSansFin: new FormControl(false)
    });
    this.roleService.GetRoles().subscribe(role => {
      this.roles = role;
    });
    this.employeService.GetManagers().subscribe(manager => {
      this.managers = manager;
    });


    this.route.params.subscribe(params=>{    
      let id= params['id']
      this.isModification = !!id;
      this.formAbs = this.initForm();
      this.formAbs.controls['dateBegin'].disable();
      if(id){
        this.titreForme = "Modification de l'employé "
        //Pour convertir les dates récupérées du backend en format NgbDateStruct
        const formatNgbDate = (sDate: Date): NgbDateStruct => {
        const date = new Date(sDate);
        return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
      };
        this.employeService.GetEmployeById(id).subscribe(EmployeById=>{
          if(EmployeById){
            this.titreForme += ": " + EmployeById.EMP_Prenom + " " + EmployeById.EMP_Nom
            this.employe = EmployeById; //-> Récupération de l'id de de l'employe pour pouvoir faire l'update ensuite
            this.formAbs.controls['nom'].setValue(EmployeById.EMP_Nom);
            this.formAbs.controls['prenom'].setValue(EmployeById.EMP_Prenom);
            this.formAbs.controls['pren2'].setValue(EmployeById.EMP_Pren2);
            this.formAbs.controls['sexe'].setValue(EmployeById.EMP_Sexe);
            this.formAbs.controls['manager'].setValue(EmployeById.EMP_Manager_id);
            this.formAbs.controls['role'].setValue(EmployeById.EMP_ROL_id);

            this.formAbs.controls['typeContrat'].setValue(EmployeById.CON_Type);
            this.formAbs.controls['joursSemaine'].setValue(EmployeById.CON_JoursSemaine);
            this.formAbs.controls['description'].setValue(EmployeById.CON_Description);
            this.formAbs.controls['dateBegin'].setValue(formatNgbDate(EmployeById.CON_DteDebut));

            if (EmployeById.CON_DteFin) { this.formAbs.controls['dateEnd'].setValue(formatNgbDate(EmployeById.CON_DteFin));
                  } else {
              this.formAbs.controls['dateEnd'].setValue(null);
                  }  
          }
        })
      } else {
        this.titreForme = "Nouvel employé"; 
        const today = new Date();
        const todayStruct: NgbDateStruct = {
              year: today.getFullYear(),
              month: today.getMonth() + 1,
              day: today.getDate()
        };

        this.formAbs.controls['dateBegin'].setValue(todayStruct);
      }
    })
  }

  private initForm(): FormGroup {
  return new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    pren2: new FormControl(''),
    sexe: new FormControl('', Validators.required),
    manager: new FormControl(null),
    role: new FormControl('', Validators.required),
    typeContrat: new FormControl({ value: '', disabled: this.isModification }, Validators.required),
    joursSemaine: new FormControl({ value: '', disabled: this.isModification }, [Validators.required, Validators.pattern('^[1-5]$')]),
    description: new FormControl({ value: '', disabled: this.isModification }),
    dateBegin: new FormControl({ value: '', disabled: true }), // toujours désactivé
    dateEnd: new FormControl(null),
    contratSansFin: new FormControl(false)
  });
}
preparerNouveauContrat() {
  const aujourdHui = new Date();
  const hier = new Date();
  hier.setDate(aujourdHui.getDate() - 1);

  // Activer les champs
  this.formAbs.controls['typeContrat'].enable();
  this.formAbs.controls['joursSemaine'].enable();
  this.formAbs.controls['description'].enable();

  // Pré-remplir la date de fin du contrat existant à hier
  this.employe.CON_DteFin = hier;

  // Réinitialiser les champs du contrat dans le formulaire
  this.formAbs.controls['typeContrat'].reset();
  this.formAbs.controls['joursSemaine'].reset();
  this.formAbs.controls['description'].reset();

  // Pré-remplir la nouvelle date de début à aujourd’hui
  const todayStruct: NgbDateStruct = {
    year: aujourdHui.getFullYear(),
    month: aujourdHui.getMonth() + 1,
    day: aujourdHui.getDate()
  };

  this.formAbs.controls['dateBegin'].setValue(todayStruct);
  this.formAbs.controls['dateBegin'].disable();

  // Réinitialiser la date de fin du contrat
  this.formAbs.controls['dateEnd'].reset();
  this.nouveauContrat = true;
}

  Save(form: FormGroup){

        //Pour convertir les dates récupérées du NgbDateStruct en format date
    const formatDate = (date: NgbDateStruct): Date => {
      return new Date(date.year, date.month - 1, date.day, 12); 
       };

    const dateEnd = this.formAbs.get('contratSansFin')?.value? null : form.value.dateEnd;

    this.employe.EMP_Nom = form.value.nom;
    this.employe.EMP_Prenom = form.value.prenom;
    this.employe.EMP_Pren2 = form.value.pren2;
    this.employe.EMP_Sexe = form.value.sexe;
    this.employe.EMP_ROL_id = form.value.role;
    this.employe.EMP_Manager_id = form.value.manager;



if (!this.isModification || (this.isModification && this.nouveauContrat)) {
  this.employe.CON_Type = form.getRawValue().typeContrat;
  this.employe.CON_JoursSemaine = Number(form.getRawValue().joursSemaine);
  this.employe.CON_Description = form.getRawValue().description;

  this.employe.CON_DteDebut = formatDate(form.getRawValue().dateBegin);
  this.employe.CON_DteFin = dateEnd && dateEnd.year ? formatDate(dateEnd) : null;
}else {
  this.employe.CON_Type = null;
  this.employe.CON_JoursSemaine = null;
  this.employe.CON_Description = null;
  this.employe.CON_DteDebut = null;
  this.employe.CON_DteFin = null;
} 
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
            
            this.router.navigate(['/employes']);
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


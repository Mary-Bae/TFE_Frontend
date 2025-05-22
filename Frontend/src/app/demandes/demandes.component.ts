import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AddDemandes, DemandeById, Demandes } from '../shared/models/demandes.model';
import { TypeAbsence } from '../shared/models/type-absence.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { AuthService } from '@auth0/auth0-angular';
import { DemandesService } from '../shared/services/demandes.service';
import { EmployeService } from '../shared/services/employe.service';

@Component({
  selector: 'app-demandes',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule, CommonModule],
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css'
})
export class DemandesComponent implements OnInit {
  model:  NgbDateStruct | null = null;
  formAbs: FormGroup;
  demande: Demandes = new Demandes();
  addDemande: AddDemandes = new AddDemandes();
  DemandeById: DemandeById = new DemandeById();
  typeAbsences: TypeAbsence[] = [];
  titreForme: string = "";
  showDuree = false;
  showJustif = false;


  ngOnInit(): void {
    emailjs.init("oWMdcekgw1oCXmcBu");
  }
   

  constructor(private demandesService: DemandesService, private employeService: EmployeService, private router: Router, private route: ActivatedRoute, public auth : AuthService ){
    this.formAbs= new FormGroup({
      type: new FormControl('', Validators.required),
      dateBegin: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      comment: new FormControl(''),
      typeJournee: new FormControl('', Validators.required),
      justificatif: new FormControl('') 
    });
    this.demandesService.GetTypeAbsByUser().subscribe(types => {
      this.typeAbsences = types;
    });

    //Pour convertir les dates récupérées du backend en format NgbDateStruct
    const formatNgbDate = (sDate: Date): NgbDateStruct => {
      const date = new Date(sDate);
      return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    };

    this.route.params.subscribe(params=>{
      let id= params['id']
      if(id){
        this.titreForme = "Modification de votre demande"
        this.demandesService.GetDemandeById(id).subscribe(DemandeById=>{
          if(DemandeById){
            this.DemandeById = DemandeById; //-> Récupération de l'id de la demande pour pouvoir faire l'update ensuite
            this.formAbs.controls['type'].setValue(DemandeById.DEM_TYPE_id);
            this.formAbs.controls['dateBegin'].setValue(formatNgbDate(DemandeById.DEM_DteDebut));
            this.formAbs.controls['dateEnd'].setValue(formatNgbDate(DemandeById.DEM_DteFin));
            this.formAbs.controls['comment'].setValue(DemandeById.DEM_Comm);
            this.formAbs.controls['typeJournee'].setValue(DemandeById.DEM_TypeJournee ?? 'Journee');
            }
        })
      } else {
        this.titreForme = "Nouvelle Demande d'Absence"; 
      }

      // Verifie si on selectionne une journée pour rendre visible ou non le champ de la durée
    this.formAbs.valueChanges.subscribe(() => {
      const d1 = this.formAbs.get('dateBegin')?.value;
      const d2 = this.formAbs.get('dateEnd')?.value;
    
      if (d1 && d2) {
        const date1 = new Date(d1.year, d1.month - 1, d1.day);
        const date2 = new Date(d2.year, d2.month - 1, d2.day);
        this.showDuree = date1.getTime() === date2.getTime(); // vrai si c'est une journée
      } else {
        this.showDuree = false;
      }
      if (!this.showDuree) {
    this.formAbs.get('typeJournee')?.setValue('Journee');
  }
    });

    })

  this.formAbs.get('type')?.valueChanges.subscribe((val) => {
  const id = parseInt(val, 10);
  this.showJustif = id === 7 || id === 8 || id === 10;
});
  }

  envoyerEmail(demande: any) {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.employeService.GetMailManagerByUser().subscribe(managerEmail => {
          const templateParams = {
            name: user.name,
            SendTo: managerEmail.EMP_Email
          };
  
        emailjs.send('FlexiTime', 'DemandeAbsence', templateParams).then(
          (response) => {
            console.log('SUCCÈS!', response.status, response.text);
          },
          (error) => {
            console.log('ÉCHEC...', error);
          }
        );
      });
      }
    })
    }

  Save(form: FormGroup){
    if (this.showJustif && !form.value.justificatif) {
  Swal.fire({
    icon: 'warning',
    title: 'Justificatif manquant',
    text: 'Vous devez ajouter un justificatif pour ce type de demande.',
    confirmButtonText: 'OK',
  });
  return;
}
    //Pour convertir les dates récupérées du NgbDateStruct en format date
    const formatDate = (date: NgbDateStruct): Date => {
      return new Date(date.year, date.month - 1, date.day, 12); 
       };

    const dateBegin = form.value.dateBegin;
    const dateEnd = form.value.dateEnd;
    // Vérification des dates, une date de fin ne peut pas être inférieure à la date de début
    if (dateEnd && dateBegin && 
      (dateEnd.year < dateBegin.year || (dateEnd.year === dateBegin.year && dateEnd.month < dateBegin.month) ||
      (dateEnd.year === dateBegin.year && dateEnd.month === dateBegin.month && dateEnd.day < dateBegin.day))) {
        // installation et importation de sweetalert2 pour une alerte plus sympatique que celle de base 
        Swal.fire({
          icon: 'warning',
          title: 'Date invalide !',
          text: 'La date de fin ne peut pas être inférieure à la date de début',
          confirmButtonText: 'OK',
      });
      return;
      }
      

    this.addDemande.DEM_DteDebut = formatDate(dateBegin);
    this.addDemande.DEM_DteFin = formatDate(dateEnd);
    this.addDemande.DEM_Comm= form.value.comment;
    this.addDemande.DEM_TYPE_id = parseInt(form.value.type);
    this.addDemande.DEM_Justificatif = form.value.DEM_Justificatif;
    this.addDemande.DEM_TypeJournee = form.value.typeJournee;
    
    // Vérifier si c'est une modification ou un ajout
    if (this.DemandeById && this.DemandeById.DEM_id) { // S'il y a DEM_id (récupéré dans GetDemandeById), on fait un update
      this.demandesService.updateDemande(this.DemandeById.DEM_id, this.addDemande)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title:'Demande d\'absence mise à jour avec succès!',
            confirmButtonText: 'OK',
          }).then(() => {  // Une fois que l'utilisateur a cliqué sur OK, je change de route
            
            this.router.navigate(['/histo-demandes']);
          });
          this.envoyerEmail(this.addDemande);
        }, 
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title:'Erreur lors de la mise à jour de la demande ! ',
            //text: err.error?.toString() || err.message,
            confirmButtonText: 'OK',
          })
        }
        });
  } else { // Sinon, on fait un ajout
      this.demandesService.PostDemande(this.addDemande)
      .subscribe({
        next: () => {
        Swal.fire({
          icon: 'success',
          title:'Demande d\'absence rajoutée avec succès!',
          confirmButtonText: 'OK',
        }).then(() => {  // Une fois que l'utilisateur a cliqué sur OK, je vide la form pour entrer une autre demande
          this.formAbs.reset();
        });
        this.envoyerEmail(this.addDemande);
      }, 
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de l\'ajout de la demande !',
          //text: err.error?.toString() || err.message,
          confirmButtonText: 'OK',
        })
      }
      });
  }
}
  navigateToCompteur(){
    this.router.navigate(['/compteur']);
  }
}

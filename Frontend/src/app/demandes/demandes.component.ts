import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AddDemandes, DemandeById, Demandes } from '../shared/demandes.model';
import { TypeAbsence } from '../shared/TypeAbsence.model';
import { DemandesService } from '../shared/demandes.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demandes',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule, CommonModule],
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css'
})
export class DemandesComponent {
  model:  NgbDateStruct | null = null;
  formAbs: FormGroup;
  demande: Demandes = new Demandes();
  addDemande: AddDemandes = new AddDemandes();
  DemandeById: DemandeById = new DemandeById();
  typeAbsences: TypeAbsence[] = [];
  titreForme: string = "";

  constructor(private demandesService: DemandesService, private router: Router, private route: ActivatedRoute ){
    this.formAbs= new FormGroup({
      type: new FormControl('', Validators.required),
      dateBegin: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      comment: new FormControl('')
    });
    this.demandesService.GetTypeAbsByUser().subscribe(types => {
      this.typeAbsences = types;
    });

    //Pour convertir les dates récupérées du backend en format NgbDateStruct, format que mon Datepicker comprend
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
          }
        })
      } else {
        this.titreForme = "Nouvelle Demande d'Absence"; 
      }
    })
  }
  Save(form: FormGroup){
    //Pour convertir les dates récupérées du NgbDateStruct en format date
    const formatDate = (date: NgbDateStruct): Date => {
      return new Date(date.year, date.month - 1, date.day);
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
    this.addDemande.TypeJournee = (document.getElementById("typeJournee") as HTMLSelectElement).value;
    
    // Vérifier si c'est une modification ou un ajout
    if (this.DemandeById && this.DemandeById.DEM_id) { // S'il y a DEM_id (récupéré dans GetDemandeById), on fait un update
      console.log("Mise à jour de la demande :", this.DemandeById);
      this.demandesService.updateDemande(this.DemandeById.DEM_id, this.addDemande)
        .subscribe(() => {
          Swal.fire({
            icon: 'success',
            title:'Demande d\'absence mise à jour avec succès!',
            confirmButtonText: 'OK',
          }).then(() => {  // Une fois que l'utilisateur a cliqué sur OK, je change de route
            this.router.navigate(['/histo-demandes']);
          });
        }, error => {
          console.error(error);
        });
  } else { // Sinon, on fait un ajout
      console.log("Ajout d'une nouvelle demande :", this.addDemande);
      this.demandesService.PostDemande(this.addDemande)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title:'Demande d\'absence rajoutée avec succès!',
          confirmButtonText: 'OK',
        }).then(() => {  // Une fois que l'utilisateur a cliqué sur OK, je vide la form pour entrer une autre demande
          this.formAbs.reset();
        });
      }, error => {
        console.error(error);
      });
  }
  }
  navigateToCompteur(){
    this.router.navigate(['/compteur']);
  }
}

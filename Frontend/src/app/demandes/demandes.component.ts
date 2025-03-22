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
  formConge: FormGroup;
  demande: Demandes = new Demandes();
  addDemande: AddDemandes = new AddDemandes();
  DemandeById: DemandeById = new DemandeById();
  typeAbsences: TypeAbsence[] = [];

  constructor(private demandesService: DemandesService, private router: ActivatedRoute ){
    this.formConge= new FormGroup({
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

    this.router.params.subscribe(params=>{
      let id= params['id']
      if(id){
        this.demandesService.GetDemandeById(id).subscribe(DemandeById=>{
          if(DemandeById){
            this.formConge.controls['type'].setValue(DemandeById.DEM_TYPE_id);
            this.formConge.controls['dateBegin'].setValue(formatNgbDate(DemandeById.DEM_DteDebut));
            this.formConge.controls['dateEnd'].setValue(formatNgbDate(DemandeById.DEM_DteFin));
            this.formConge.controls['comment'].setValue(DemandeById.DEM_Comm);
          }
        })
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
      (dateEnd.year < dateBegin.year ||
      (dateEnd.year === dateBegin.year && dateEnd.month < dateBegin.month) ||
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
    this.addDemande.DEM_DureeHeures = 53;
    
    this.demandesService.Post(this.addDemande);
  }

}

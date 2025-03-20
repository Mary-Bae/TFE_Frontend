import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Demandes } from '../shared/demandes.model';
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

    this.router.params.subscribe(params=>{
      let id= params['id']
      if(id){
        this.demandesService.GetById(id).subscribe(demande=>{
          if(demande){
            this.formConge.controls['type'].setValue(demande.TYPE_Libelle);
            this.formConge.controls['dateBegin'].setValue(demande.DEM_DteDebut);
            this.formConge.controls['dateEnd'].setValue(demande.DEM_DteFin);
            this.formConge.controls['comment'].setValue(demande.DEM_Comm);

          }
        })
      }
    })
  }
  Save(form: FormGroup){

    const formatDate = (date: NgbDateStruct): string => {
      return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
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

    //this.demande.type= form.value.type;
    //this.demande.dateBegin= formatDate(form.value.dateBegin);
    //this.demande.dateEnd= formatDate(form.value.dateEnd);
    //this.demande.comment= form.value.comment;

    this.demandesService.Post(this.demande);
  }

}

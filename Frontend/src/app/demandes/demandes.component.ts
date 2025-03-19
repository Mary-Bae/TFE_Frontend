import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Demandes } from '../shared/demandes.model';
import { DemandesService } from '../shared/demandes.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-demandes',
  standalone: true,
  imports: [ReactiveFormsModule, NgbDatepickerModule],
  templateUrl: './demandes.component.html',
  styleUrl: './demandes.component.css'
})
export class DemandesComponent {
  model:  NgbDateStruct | null = null;
  formConge: FormGroup;
  demande: Demandes = new Demandes();

  constructor(private demandesService: DemandesService, private router: ActivatedRoute ){
    this.formConge= new FormGroup({
      type: new FormControl('', Validators.required),
      dateBegin: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      comment: new FormControl('')
    });

    this.router.params.subscribe(params=>{
      let id= params['id']
      if(id){
        this.demandesService.GetById(id).subscribe(demande=>{
          if(demande){
            //this.formConge.controls['type'].setValue(demande.type);
            //this.formConge.controls['dateBegin'].setValue(demande.dateBegin);
            //this.formConge.controls['dateEnd'].setValue(demande.dateEnd);
            //this.formConge.controls['comment'].setValue(demande.comment);

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

    if (dateEnd && dateBegin && 
      (dateEnd.year < dateBegin.year ||
      (dateEnd.year === dateBegin.year && dateEnd.month < dateBegin.month) ||
      (dateEnd.year === dateBegin.year && dateEnd.month === dateBegin.month && dateEnd.day < dateBegin.day))) {
        // installation et importation de sweetalert2 pour une alerte plus sympatique que celle de base 
        Swal.fire({
          icon: 'warning',
          title: 'Date invalide !',
          text: 'La date de fin ne peut pas être avant la date de début',
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

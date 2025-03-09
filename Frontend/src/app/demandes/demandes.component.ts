import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Demandes } from './demandes.model';
import { DemandesService } from './demandes.service';

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
  

  constructor(private demandesService: DemandesService){
    this.formConge= new FormGroup({
      type: new FormControl('', Validators.required),
      dateBegin: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      comment: new FormControl('')

    })
  }
  Save(form: FormGroup){
    this.demande.type= form.value.type;
    this.demande.dateBegin= form.value.dateBegin;
    this.demande.dateEnd= form.value.dateEnd;
    this.demande.comment= form.value.comment;

    this.demandesService.Post(this.demande);
  }

}

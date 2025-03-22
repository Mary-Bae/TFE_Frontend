import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DemandesService } from '../shared/demandes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-histo-demandes',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './histo-demandes.component.html',
  styleUrl: './histo-demandes.component.css'
})
export class HistoDemandesComponent {

  demandes: any;

  constructor(private demandesService: DemandesService, private router:Router){
    demandesService.GetDemandesByUser().subscribe(x=>{
      this.demandes=x
    })
    
  }
  edit(id:Int32Array){
this.router.navigate(['demandes', id])
  }
}

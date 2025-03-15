import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Demandes } from '../shared/demandes.model';
import { DemandesService } from '../shared/demandes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-histo-demandes',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './histo-demandes.component.html',
  styleUrl: './histo-demandes.component.css'
})
export class HistoDemandesComponent {

  demandes: any;

  constructor(private demandesService: DemandesService, private router:Router){
    demandesService.Get().subscribe(x=>{
      this.demandes=x
    })
    
  }
  edit(id:Int32Array){
this.router.navigate(['demandes', id])
  }
}

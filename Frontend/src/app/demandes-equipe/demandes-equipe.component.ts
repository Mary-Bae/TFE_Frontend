import { Component, OnInit } from '@angular/core';
import { DemandesService } from '../shared/demandes.service';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-demandes-equipe',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './demandes-equipe.component.html',
  styleUrl: './demandes-equipe.component.css'
})
export class DemandesEquipeComponent {
  demandes: any;

  constructor(private demandesService: DemandesService, private router:Router){
  }
  ngOnInit(): void {
    this.loadDemandes();  }

  loadDemandes() {
    this.demandesService.GetDemandesEquipe().subscribe(x=>{
      this.demandes=x
    })
  }
}

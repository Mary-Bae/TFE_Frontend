import { Component, OnInit } from '@angular/core';
import { DemandesService } from '../shared/demandes.service';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { EmployeService } from '../shared/employe.service';

@Component({
  selector: 'app-demandes-equipe',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './demandes-equipe.component.html',
  styleUrl: './demandes-equipe.component.css'
})
export class DemandesEquipeComponent implements OnInit{
  demandes: any;

  constructor(private demandesService: DemandesService, private router:Router, private employeService: EmployeService){
  }
  ngOnInit(): void {
    this.loadDemandes();
    emailjs.init("oWMdcekgw1oCXmcBu");  
  }

  loadDemandes() {
    this.demandesService.GetDemandesEquipe().subscribe(x=>{
      this.demandes=x
    })
  }
  majStatut(demande: any, statut: number) {
    this.demandesService.updStatutDemande(demande.DEM_id, statut).subscribe({
      next: () => {
        this.loadDemandes();
        this.demandesService.GetDemandeById(demande.DEM_id).subscribe((demandeMAJ) => {
          this.envoyerEmail(demandeMAJ);
        });
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut :', err);
      }
    });
  }
  envoyerEmail(demande: any) {
        this.employeService.GetMailByDemande(demande.DEM_id).subscribe(employe => {
          const templateParams = {
            name: employe.EMP_Nom,
            lastname: employe.EMP_Prenom,
            SendTo: employe.EMP_Email,
            dateDemande: new Date(demande.DEM_DteDemande).toLocaleDateString('fr-BE'),
            dateDebut: new Date(demande.DEM_DteDebut).toLocaleDateString('fr-BE'),
            dateFin: new Date(demande.DEM_DteFin).toLocaleDateString('fr-BE'),
            statut: demande.DEM_STAT_id === 2 
            ? 'acceptée' : demande.DEM_STAT_id === 3 ? 'refusée' : 'en cours'
          };
  
        emailjs.send('FlexiTime', 'ValidationAbsence', templateParams).then(
          (response) => {
            console.log('SUCCÈS!', response.status, response.text);
          },
          (error) => {
            console.log('ÉCHEC...', error);
          }
        );
      });
    }
}

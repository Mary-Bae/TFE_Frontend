import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DemandesService } from '../shared/demandes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-histo-demandes',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './histo-demandes.component.html',
  styleUrl: './histo-demandes.component.css'
})
export class HistoDemandesComponent implements OnInit{

  demandes: any;

  constructor(private demandesService: DemandesService, private router:Router){
    
    
  }
  ngOnInit(): void {
    this.loadDemandes();  }

  loadDemandes() {
    this.demandesService.GetDemandesByUser().subscribe(x=>{
      this.demandes=x
    })
  }

  edit(id:Int32Array){
this.router.navigate(['demandes', id])
  }

  delete(id: number) {
    if (confirm('Voulez-vous vraiment annuler cette demande ?')) {
      this.demandesService.DeleteDemande(id).subscribe(response => {    
        console.log('Course deleted successfully', response);
        Swal.fire({
                  icon: 'success',
                  title: 'Demande supprimée avec succès !',
                  confirmButtonText: 'OK',
              });
        this.loadDemandes();
      },
      error => {
        console.error("Failed to delete course:", error);
      }
    );
      }     
   }
}

import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { EmployeService } from '../shared/services/employe.service';

@Component({
  selector: 'app-employes-desactives',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './employes-desactives.component.html',
  styleUrl: './employes-desactives.component.css'
})
export class EmployesDesactivesComponent implements OnInit{
employes: any;

constructor(private employeService: EmployeService, private router:Router){
    
  }
  ngOnInit(): void {
    this.loadEmploye(); 
  }
  loadEmploye() {
    this.employeService.GetDeletedUsers().subscribe(x=>{
      this.employes=x
    })
  }

  restore(id: number) {
    if (confirm('Voulez-vous vraiment restaurer cet utilisateur ?')) {
      this.employeService.RestoreEmploye(id, this.employes).subscribe({
        next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Employé restauré avec succès !',
          confirmButtonText: 'OK',
        });
        this.loadEmploye();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la restauration',
          text: err.error?.toString() || err.message,
          confirmButtonText: 'OK'
        });
      }
      });    
     }
}

   navigateToActived(){
      this.router.navigate(['/employes']);

  }
  }



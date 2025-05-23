import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { EmployeService } from '../shared/services/employe.service';

@Component({
  selector: 'app-employes',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.css'
})
export class EmployesComponent implements OnInit {

  employes: any;

  constructor(private employeService: EmployeService, private router:Router){
    
  }
  ngOnInit(): void {
    this.loadDemandes(); 
  }
  loadDemandes() {
    this.employeService.GetUsers().subscribe(x=>{
      this.employes=x
    })
  }
edit(id:Int32Array){
this.router.navigate(['employes-management', id])
  }
  absences(id:Int32Array){
this.router.navigate(['absences', id])
  }

  delete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.employeService.DelEmploye(id).subscribe(response => {    
        console.log('User deleted successfully', response);
        Swal.fire({
                  icon: 'success',
                  title: 'Employé supprimé avec succès !',
                  confirmButtonText: 'OK',
              });
        this.loadDemandes();
      },
      error => {
        console.error("Failed to delete user:", error);
      }
    );
      }     
   }
  }

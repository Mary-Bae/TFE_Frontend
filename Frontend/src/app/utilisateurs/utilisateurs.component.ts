import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeService } from '../shared/employe.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateurs',
  standalone: true,
  imports: [NgbModule, CommonModule],
  templateUrl: './utilisateurs.component.html',
  styleUrl: './utilisateurs.component.css'
})
export class UtilisateursComponent implements OnInit {

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
this.router.navigate(['utilisateurs-management', id])
  }

  // delete(id: number) {
  //   if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
  //     this.employeService.DeleteDemande(id).subscribe(response => {    
  //       console.log('Course deleted successfully', response);
  //       Swal.fire({
  //                 icon: 'success',
  //                 title: 'Demande supprimée avec succès !',
  //                 confirmButtonText: 'OK',
  //             });
  //       this.loadDemandes();
  //     },
  //     error => {
  //       console.error("Failed to delete course:", error);
  //     }
  //   );
  //     }     
  //  }
  }

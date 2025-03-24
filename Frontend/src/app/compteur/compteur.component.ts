import { Component } from '@angular/core';
import { CompteurService } from '../shared/compteur.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-compteur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compteur.component.html',
  styleUrl: './compteur.component.css'
})
export class CompteurComponent {

  compteur: any;
  annee: number = new Date().getFullYear();
  date: string= new Date().toLocaleDateString()
  
    constructor(public auth : AuthService, private compteurService:CompteurService){
      this.compteurService.GetCompteurByUser().subscribe(x=>{
        this.compteur=x
      })
    }

}

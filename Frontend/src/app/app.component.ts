import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgbCollapseModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularauth0';
  isMenuCollapsed = true;

  constructor(public auth : AuthService) {}
  
  login(){
    this.isMenuCollapsed = true;
    this.auth.loginWithRedirect();
  }
  logout(){
    this.isMenuCollapsed = true;
    this.auth.logout();
  }
}

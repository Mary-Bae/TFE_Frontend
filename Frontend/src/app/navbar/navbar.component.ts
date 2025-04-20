import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { ThemeService } from '../shared/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
constructor(public auth : AuthService, private theme : ThemeService){}

changeTheme() {
  const current = this.theme.currentActive();
  const next = current === 'dark' ? 'light' : 'dark';
  this.theme.update(next);
}
logout(){
  this.auth.logout();
}
}


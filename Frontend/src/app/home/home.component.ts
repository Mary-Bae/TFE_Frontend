import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import{HttpClient} from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  response = '';
constructor(public auth : AuthService, private http : HttpClient){}

login(){
  this.auth.loginWithRedirect();
}
logout(){
  this.auth.logout();
}

callWebApi() {
  this.response = 'wait for api ...'
this.http.get<string>('https://localhost:7290/api/test/GetPublic')

  .subscribe({
    next : (v) => this.response = JSON.stringify(v)
  });
}
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  response = '';
constructor(private http : HttpClient, private auth:AuthService){}

callWebApi() {
  this.response = 'wait for api ...'
  this.auth.getAccessTokenSilently()
  .subscribe({
    next:(token) =>{
      this.http.get<string>('https://localhost:7290/api/test/GetPrivate',
        {headers : {Authorization : 'Bearer ' + token}}
      )
      .subscribe({
        next : (v) => this.response = JSON.stringify(v),
        error : (err) => this.response = 'Error : ' + JSON.stringify(err)
      });
    }
  })
}
}

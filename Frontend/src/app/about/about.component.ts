import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  response = '';
  constructor(private http : HttpClient, private auth : AuthService){}
  
  callWebApi() {
    this.response = 'wait for api ...'
   this.auth.getAccessTokenSilently()
   .subscribe({
    next : (a) => {
    console.log(a)
        //  this.http.get<string>('http://localhost:5000/api/values/getallprivate',
          //  {headers : {Authorization :'Bearer ' + a}}
          //)
          //.subscribe({
            //next : (v) => this.response = JSON.stringify(v),
            //error : (err) => this.response ='Error : ' + JSON.stringify(err)
         // });
        }
      }
    );
    this.http.get<string>('http://localhost:5000/api/values/getallprivate')
  .subscribe({
    next : (v) => this.response = JSON.stringify(v)
  });
  }

  callWebApiClient() {
    this.http.get<string>('http://localhost:5000/api/values/getallprivateclient')
  .subscribe({
    next : (v) => this.response = JSON.stringify(v)
  });
  }
  callWebApiAdmin() {
    this.http.get<string>('http://localhost:5000/api/values/getallprivateadmin')
  .subscribe({
    next : (v) => this.response = JSON.stringify(v)
  });
  }
}

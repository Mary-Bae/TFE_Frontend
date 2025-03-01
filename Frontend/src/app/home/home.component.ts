import { Component } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  response = '';
constructor(private http : HttpClient){}

callWebApi() {
  this.response = 'wait for api ...'
  this.http.get<string>('http://localhost:5000/api/values/getall')
  .subscribe({
    next : (v) => this.response = JSON.stringify(v)
  });
}
}

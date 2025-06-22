import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
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
export class HomeComponent  implements OnInit {
  blocked: boolean = false;
  ready = false;

constructor(public auth : AuthService, private http : HttpClient, private cdr: ChangeDetectorRef){
  
}

ngOnInit(): void {
  this.auth.error$.subscribe((err: any) => {
    const errorText = typeof err === 'string' ? err.toLowerCase() : 
                      typeof err?.message === 'string' ? err.message.toLowerCase() : 
                      typeof err?.error_description === 'string' ? err.error_description.toLowerCase() : '';

    if (errorText.includes('user is blocked')) {
      this.blocked = true;
    }

    this.ready = true;
    this.cdr.detectChanges();
  });
}

login(){
  this.auth.loginWithRedirect();
}
logout(){
  this.auth.logout();
}

}

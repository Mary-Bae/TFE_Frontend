import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    { path: '', component:HomeComponent },
    {path : 'home', component : HomeComponent},
    {path : 'dashboard', canActivate : [AuthGuard], component : DashboardComponent}
];

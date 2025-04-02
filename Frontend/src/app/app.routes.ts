import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { DemandesComponent } from './demandes/demandes.component';
import { HistoDemandesComponent } from './histo-demandes/histo-demandes.component';
import { CompteurComponent } from './compteur/compteur.component';

export const routes: Routes = [
    { path: '', component:HomeComponent },
    {path : 'home', component : HomeComponent},
    {path : 'calendrier', canActivate : [AuthGuard], component : CalendrierComponent},
    {path : 'demandes', canActivate : [AuthGuard], component : DemandesComponent},
    {path : 'demandes/:id', canActivate : [AuthGuard], component : DemandesComponent},
    {path : 'histo-demandes', canActivate : [AuthGuard], component : HistoDemandesComponent},
    {path : 'compteur', canActivate : [AuthGuard], component : CompteurComponent}
];
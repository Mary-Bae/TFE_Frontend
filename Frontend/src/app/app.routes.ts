import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { DemandesComponent } from './demandes/demandes.component';
import { HistoDemandesComponent } from './histo-demandes/histo-demandes.component';
import { CompteurComponent } from './compteur/compteur.component';
import { DemandesEquipeComponent } from './demandes-equipe/demandes-equipe.component';
import { CalendrierCommunComponent } from './calendrier-commun/calendrier-commun.component';
import { EmployesManagementComponent } from './employes-management/employes-management.component';
import { AbsencesComponent } from './absences/absences.component';
import {EmployesComponent} from './employes/employes.component';

export const routes: Routes = [
    { path: '', component:HomeComponent },
    {path : 'home', component : HomeComponent},
    {path : 'calendrier', canActivate : [AuthGuard], component : CalendrierComponent},
    {path : 'demandes', canActivate : [AuthGuard], component : DemandesComponent},
    {path : 'demandes/:id', canActivate : [AuthGuard], component : DemandesComponent},
    {path : 'histo-demandes', canActivate : [AuthGuard], component : HistoDemandesComponent},
    {path : 'compteur', canActivate : [AuthGuard], component : CompteurComponent},
    {path : 'demandes-equipe', canActivate : [AuthGuard], component : DemandesEquipeComponent},
    {path : 'calendrier-commun', canActivate : [AuthGuard], component : CalendrierCommunComponent},
    {path : 'employes', canActivate : [AuthGuard], component : EmployesComponent},
    {path : 'employes-management', canActivate : [AuthGuard], component : EmployesManagementComponent},
    {path : 'employes-management/:id', canActivate : [AuthGuard], component : EmployesManagementComponent},
    {path : 'absences/:id', canActivate : [AuthGuard], component : AbsencesComponent}
];
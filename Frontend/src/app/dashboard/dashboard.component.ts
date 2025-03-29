import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DemandesService } from '../shared/demandes.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  calendarOptions: any = {
    plugins: [dayGridPlugin],
    height: '550PX',
    events: [],
    weekends: false,
    locale: 'fr',
    buttonText: {
      today:    'Aujourd\'hui',
      month:    'Mois',
      week:     'Semaine',
      list:     'Liste'
  }
  };
  constructor(private demandesService: DemandesService) {}

  ngOnInit() : void{
    const couleurParType: { [key: number]: string } = {
      1: 'green',      //congés payés
      2: 'blue',       // télétravail
      3: 'purple',     // congé-éducation payé
      4: 'red',    // congé de maternité
      5: 'red',    // congé de paternité
      6: 'red',      // interruption de carrière
      7: 'orange',      // congé de circonstance
      8: 'orange',     // congé pour raison impérieuse
      9: 'yellow',    // congé politique
      10: 'red'      // maladie
    };

    this.demandesService.GetDemandesByUser().subscribe(demandes => {
      this.calendarOptions.events = demandes.map(demande => {
        const couleur = couleurParType[demande.DEM_TYPE_id];
        return {
          title: demande.TYPE_Libelle,
          start: demande.DEM_DteDebut,
          end: demande.DEM_DteFin,
          backgroundColor: couleur,
          borderColor: couleur,
          allDay: true
        };
      });
  });
  }
}

import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DemandesService } from '../shared/demandes.service';
import { JoursFeriesService } from '../shared/jours-feries.service';

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
    eventSources: [],  //Pour permettre des données provenant de plusieurs sources
    weekends: false,
    locale: 'fr',
    buttonText: {
      today:    'Aujourd\'hui',
      month:    'Mois',
      week:     'Semaine',
      list:     'Liste'
  }
  };
  constructor(private demandesService: DemandesService, private joursFeriesService: JoursFeriesService) {}

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
      const demandesEvents  = demandes.map(demande => {
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
  
  this.joursFeriesService.GetJoursFeries().subscribe(jourFerie => {
    const joursFeriesEvent =  jourFerie.map(jourFerie => {
      return {
        title: jourFerie.JFER_Description,
        start: jourFerie.JFER_DteFerie,
        end: jourFerie.JFER_DteFerie,
        backgroundColor: "gray",
        allDay: true
      };
    });
    // Ici on rajoute les events des differentes sources à eventSources
    this.calendarOptions.eventSources = [
      { events: demandesEvents },
      { events: joursFeriesEvent }
    ];
  });
  }
)}}

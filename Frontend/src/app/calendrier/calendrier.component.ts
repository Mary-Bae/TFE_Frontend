import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { JoursFeriesService } from '../shared/services/jours-feries.service';
import { DemandesService } from '../shared/services/demandes.service';

@Component({
  selector: 'app-calendrier',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendrier.component.html',
  styleUrl: './calendrier.component.css'
})
export class CalendrierComponent implements OnInit{
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
        let couleur = couleurParType[demande.DEM_TYPE_id];
        let textColor = 'white';

        if (demande.STAT_Libelle === 'Refusé') {
          couleur = '#f5f5f5';           // gris clair
          textColor = '#dc3545';         // rouge (refusé)
        } else if (demande.STAT_Libelle === 'En attente') {
          couleur = '#e6f0ff';           // bleu très clair
          textColor = '#007bff';         // bleu classique
        }

        return {
          title: demande.TYPE_Libelle,
          start: demande.DEM_DteDebut,
          end: new Date(new Date(demande.DEM_DteFin).setDate(new Date(demande.DEM_DteFin).getDate() + 1)), //Permet de rajouter un jour car autrement la valeur sera < dateFin au lieu de <= dateFin
          backgroundColor: couleur,
          borderColor: couleur,
          textColor: textColor,
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

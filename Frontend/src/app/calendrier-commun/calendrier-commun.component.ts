import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DemandesService } from '../shared/demandes.service';
import { JoursFeriesService } from '../shared/jours-feries.service';

@Component({
  selector: 'app-calendrier-commun',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendrier-commun.component.html',
  styleUrl: './calendrier-commun.component.css'
})
export class CalendrierCommunComponent implements OnInit {

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
}
constructor(private demandesService: DemandesService, private joursFeriesService: JoursFeriesService) {}

  ngOnInit(): void {
    const couleurParPersonne: { [key: string]: string } = {};
    const couleurs = ['green', 'blue', 'purple', 'red', 'orange', 'yellow', '#1abc9c', '#9b59b6', '#34495e', '#e67e22'];
    let indexCouleur = 0;

    this.demandesService.GetDemandesEquipe().subscribe(demandes => {
      const demandesEvents  = demandes.map(demande => {
        if (!(demande.EMP_Nom in couleurParPersonne)) {
          couleurParPersonne[demande.EMP_Nom] = couleurs[indexCouleur];
          indexCouleur++;
          if (indexCouleur >= couleurs.length) indexCouleur = 0;
        }
        let couleur = couleurParPersonne[demande.EMP_Nom];
        let textColor = 'white';

        if (demande.STAT_Libelle === 'Refusé') {
          couleur = '#f5f5f5';           // gris clair
          textColor = '#dc3545';         // rouge (refusé)
        } 
        else if (demande.STAT_Libelle === 'En attente') {
          couleur = '#e6f0ff';           // bleu très clair
          textColor = '#007bff';         // bleu classique
        }

        return {
          title: demande.EMP_Nom + ' - ' + demande.TYPE_Libelle,
          start: demande.DEM_DteDebut,
          end: new Date(new Date(demande.DEM_DteFin).setDate(new Date(demande.DEM_DteFin).getDate() + 1)), //Permet de rajouter un jour car autrement la valeur sera < dateFin au lieu de <= dateFin
          backgroundColor: couleur,
          borderColor: couleur,
          textColor: textColor,
          allDay: true,
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

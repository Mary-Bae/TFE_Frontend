export class TypeAbsence{
    TAEM_id: number;
    TAEM_TYPE_id: number;
    TYPE_Libelle: String;
    TAEM_NbrJoursAn: number;
    TAEM_NbrJoursSemaine: number;    
    TAEM_Heures: number;
    TAEM_AnneeEffective: number;
}
export class Absence{
    TYPE_id: number;
    TYPE_Libelle: String;
}

export class JoursParContrat {
  JoursSuggérés: number;
}
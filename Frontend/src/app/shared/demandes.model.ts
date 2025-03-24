export class Demandes{
    DEM_id: number;
    DEM_DteDemande: Date;
    DEM_DteDebut: Date;
    DEM_DteFin: Date;    
    DEM_Comm: String;
    TYPE_Libelle: String;
    DEM_TYPE_id: number; 
    STAT_Libelle:String;
    DEM_Justificatif?: String;
    DEM_DureeHeures: number;
}
export class DemandeById{
    DEM_id: number;
    DEM_DteDemande: Date;
    DEM_DteDebut: Date;
    DEM_DteFin: Date;    
    DEM_Comm: String;
    DEM_TYPE_id: number; 
    DEM_STAT_id:number;
    DEM_EMP_id:number;
    DEM_Justificatif?: String;
    DEM_DureeHeures: number;
}
export class AddDemandes{
    DEM_DteDebut: Date;
    DEM_DteFin: Date;    
    DEM_Comm: String;
    DEM_TYPE_id: number; 
    DEM_Justificatif?: String;
    DEM_DureeHeures: number;
    TypeJournee: string;
}
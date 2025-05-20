export class Demandes{
    DEM_id: number;
    EMP_Nom: string;
    DEM_DteDemande: Date;
    DEM_DteDebut: Date;
    DEM_DteFin: Date;    
    DEM_Comm: string;
    TYPE_Libelle: string;
    DEM_TYPE_id: number; 
    STAT_Libelle:string;
    DEM_Justificatif?: string;
    DEM_DureeHeures: number;
}
export class DemandeById{
    DEM_id: number;
    DEM_DteDemande: Date;
    DEM_DteDebut: Date;
    DEM_DteFin: Date;    
    DEM_Comm: string;
    DEM_TYPE_id: number; 
    DEM_STAT_id:number;
    DEM_EMP_id:number;
    DEM_Justificatif?: string;
    DEM_DureeHeures: number;
    DEM_TypeJournee: string;
}
export class AddDemandes{
    DEM_DteDebut: Date;
    DEM_DteFin: Date;    
    DEM_Comm: string;
    DEM_TYPE_id: number; 
    DEM_Justificatif?: string;
    DEM_DureeHeures: number;
    DEM_TypeJournee: string;
}
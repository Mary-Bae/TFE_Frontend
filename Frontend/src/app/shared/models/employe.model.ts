export class Employe{
    EMP_id: number;
    EMP_Nom: string;
    EMP_Prenom: string;
    EMP_Pren2: string;
    EMP_Sexe: string;
    EMP_Email: string;
    EMP_Auth: string;
    ROL_Libelle: string;
    EMP_ROL_id: number;
    EMP_Manager_id: number;
    EMP_Manager: string;

    CON_id: number;
    CON_Type: string;
    CON_JoursSemaine: number;
    CON_Description: string;
    CON_DteDebut: Date;
    CON_DteFin: Date;
    CON_EMP_id: number;
}
export class EmployeNoms{
    EMP_id: number;
    EMP_Nom: string;
}
import type { Exhibition } from "./exhibition";

export interface Visitor {
    id:           number;
    name:         string;
    phone:        string;
    email:        string;
    fair:         string;
    date:         Date;
    executor:     'individual' | 'company';
    country:      string;
    companyName:  string;
    qrValue:      string;
    qr:           boolean;
    exhibitionId: number;
    exhibiton:    Exhibition;
}
export interface Source{
    id:number,
    name:string
}
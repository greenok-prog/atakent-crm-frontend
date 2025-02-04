import type { Organizer } from "./organizer"

export interface Exhibition{
    name:string, 
    description:string,
    dateStart:Date,
    dateEnd:Date,
    image?: File,
    location:string
    id:number
    organizer:Organizer
}


export interface ExhibitionCreate{
    name:string, 
    description:string,
    dateStart:Date,
    dateEnd:Date,
    image?: File,
    location:string
    organizer_id:number
}

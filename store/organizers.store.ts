
import type { Organizer } from "~/types/organizer"

export const useOrganizersStore = defineStore('organizers', {
    state: () => {
        return {
            organizers:[] as Organizer[]
        } 
    },
    actions:{
        async getOrganizers(organizers:Organizer[]){
                this.organizers = organizers
                return this.organizers  
        },
        async addOrganizer(data:Organizer){
            this.organizers.push(data)
            
            
        },
        async removeOrganizer(id:number){
            this.organizers = this.organizers.filter(el => el.id !== id)
            
        }
    },
   
})
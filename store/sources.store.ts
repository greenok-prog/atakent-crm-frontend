
import type { Exhibition } from "~/types/exhibition"
import type { Source } from "~/types/source"
import type { AuthResponse, User } from "~/types/user"

export const useSourcesStore = defineStore('sources', {
    state: () => {
        return {
            sources:[] as Source[]
        } 
    },
    actions:{
        async getSources(sources:Source[]){
                this.sources = sources
                return this.sources  
        },
        async addSource(data:Source){
            this.sources.push(data)
            
            
        },
        async removeSource(id:number){
            this.sources = this.sources.filter(el => el.id !== id)
            
        }
    },
    getters:{
       getExhibitionList: (state) => state.sources
    }
})
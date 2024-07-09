import type { Exhibition } from "~/types/exhibition"
import type { AuthResponse, User } from "~/types/user"

export const useExhibitionsStore = defineStore('exhibitions', {
    state: () => {
        return {
            exhibitions:[] as Exhibition[]
        } 
    },
    actions:{
        async getExhibitions(){
            if(this.exhibitions.length){
                return this.exhibitions
            }
            const {data} = await useAPI<Exhibition[]>('/exhibitions')
            if(data.value){
                this.exhibitions = data.value
                return this.exhibitions
            }
        },
        async addExhibition(data:any){
            const res = await useAPI<Exhibition>('/exhibitions', {
                method:'POST',
                body:data
            })
            if(res.data.value){
                this.exhibitions.push(res.data.value)
            }
            return res
        },
        async removeExhibition(id:number){
            const res = await useAPI('/exhibitions/'+id, {
                method:"delete"
            })

            
            if(res.status.value === 'success'){
                this.exhibitions = this.exhibitions.filter(el => el.id !== id)
            }
            return res
            
        }
    },
    getters:{
       getExhibitionList: (state) => state.exhibitions
    }
})
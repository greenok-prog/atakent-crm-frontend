import { ExhibitionsService } from "~/services/exhibition.service"
import type { Exhibition, ExhibitionCreate } from "~/types/exhibition"
import type { AuthResponse, User } from "~/types/user"

export const useExhibitionsStore = defineStore('exhibitions', () => {
    const exhibitions = ref<Exhibition[]>([])
    const isLoaded = ref(false)
    const toast = useToast()
    const exhibitionsService = new ExhibitionsService(toast)

    const getExhibitions = async () => {
        if(isLoaded.value){
            return
        }
        const {data} = await exhibitionsService.get()
        if(data.value){
            exhibitions.value = data.value
            isLoaded.value = true
        }
    }
    const removeExhibition = async (id:number) => {
        const {error} = await exhibitionsService.remove(id)
        if(!error.value){
            exhibitions.value = exhibitions.value.filter(el => el.id !== id)
        }
    }
    const addExhibition = async (exhibition:Exhibition) => {
        const {data} = await exhibitionsService.add(exhibition)
        if(data.value){
            console.log(data.value);
            
            exhibitions.value.push(data.value)
        }
    }
    const changeExhibition = async (id:number,exhibition:Exhibition) => {
        const res = await exhibitionsService.change(id, exhibition)
        
        return res

    }

    return {
        exhibitions,
        getExhibitions,
        removeExhibition,
        addExhibition,
        changeExhibition
    }
})
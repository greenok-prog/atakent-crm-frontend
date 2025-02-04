import type { ToastServiceMethods } from "primevue/toastservice";
import { API_ROUTES } from "~/constants/api";
import type { Organizer } from "~/types/organizer";
import type { Source } from "~/types/visitor";

interface RequestsOptions{
    refresh?: (opts?:undefined) => Promise<void>
}

export class OrganizerService{
    private toast?: ToastServiceMethods;
    constructor (toast? : ToastServiceMethods){
        this.toast = toast
    }
    async get(){
        const res = await useAPI<Organizer[]>(API_ROUTES.ORGANIZERS);
        return res
    }
    async remove(id: number, options?: RequestsOptions){
        const res = await useAPI(`${API_ROUTES.ORGANIZERS}/${id}`, {
            method: 'DELETE'
            });
        
            if (res.error.value) {
                if(this.toast){
                    this.toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при удалении организатора', life: 3000 });
                } // Уведомление об ошибке
                
            } else {
                if(this.toast){
                    this.toast.add({ severity: 'success', summary: 'Успех', detail: 'Организатор успешно удален', life: 3000 }); // Уведомление об успехе
                }
                if(options?.refresh){
                    options.refresh();
                }
                
            }
    }
    async add(name:string, options:RequestsOptions){
        if (!name.trim() && this.toast) {
            this.toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Название организатора не может быть пустым', life: 3000 }); // Уведомление об ошибке
            return;
          }
      
          const { error } = await useAPI(API_ROUTES.ORGANIZERS, {
            method: 'POST',
            body: {
              name
            }
          });
      
          if (error.value && this.toast) {
            this.toast.add({ severity: 'error', summary: 'Ошибка', detail: 'Ошибка при добавлении организатора', life: 3000 }); // Уведомление об ошибке
            console.error('Ошибка при добавлении организатора:', error.value);
          } else {
           if(this.toast){
            this.toast.add({ severity: 'success', summary: 'Успех', detail: 'Организатор успешно добавлен', life: 3000 }); // Уведомление об успехе
           }
            if(options.refresh){
                options.refresh();
            }
          }
          return error.value
    }
  }
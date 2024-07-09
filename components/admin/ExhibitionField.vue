<template>
    <div class="flex flex-col gap-2">
        <div class="flex items-center gap-4">
          <InputText :disabled="!isEditing" v-model="inputValue" class="w-96"/>
          <div class="flex items-center gap-2">
            <Button v-if="!isEditing" icon='pi pi-pencil' @click="changeDisable"/>
            <Button icon='pi pi-check' v-else @click="editExhibition"/>
            <Button icon="pi pi-times" v-if="!isEditing" @click="removeHandler"/>
          </div>
        </div>
        <div v-if="isEditing" class="flex flex-col gap-1">
            <label>Файл билета</label>
            <input type="file" @change="onAddFile">
        </div>
    </div>
        <Toast/>
</template>

<script lang="ts" setup>
import { useExhibitionsStore } from '~/store/exhibitions.store';
import type { Exhibition } from '~/types/exhibition';

const props = withDefaults(defineProps<{
    exhibition:Exhibition,
    initialEditing?:boolean
}>(), {
    initialEditing:false
})
const emit = defineEmits(['refreshData'])
const {removeExhibition} = useExhibitionsStore()
const toast = useToast()
const showToast = (status: 'error' | 'success' ='success') => {
   if(status === 'success'){
    toast.add({ severity: 'success',  summary: 'Сохранено', detail:'Название успешно изменено', life: 3000 })
   }else{
    toast.add({ severity: 'error',  summary: 'Ошибка', detail:'Произошла ошибка', life: 3000 })
   }
}
const inputValue = ref(props.exhibition.name)
const file = ref<undefined | File>(undefined)
const isEditing = ref(props.initialEditing)

const changeDisable = () => {
    isEditing.value = !isEditing.value
}

const removeHandler = async () => {
    const {error} = await removeExhibition(props.exhibition.id) 

    error.value ? showToast('error') : toast.add({ severity: 'success',  summary: 'Удалено', detail:'Выставка удалена', life: 3000 })   
}
const onAddFile = (event) => {
    if(event.target){
        file.value = event.target.files[0]
    }
}
const editExhibition = async () => {
    const formData = new FormData()
    formData.append('name', inputValue.value)
    if(file.value){
        formData.append('ticketImg', file.value)
    }
    const {error} = await useAPI<Exhibition>(`/exhibitions/${props.exhibition.id}`, {
    method:'PATCH',
    body:formData
    })
    error.value ?  showToast('error') : showToast()
    changeDisable()
}



</script>
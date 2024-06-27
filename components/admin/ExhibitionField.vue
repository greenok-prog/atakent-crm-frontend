<template>
    <div class="flex items-center gap-4">
          <InputText :disabled="!isEditing" v-model="inputValue" class="w-96"/>
          <div class="flex items-center gap-2">
            <Button v-if="!isEditing" icon='pi pi-pencil' @click="changeDisable"/>
            <Button icon='pi pi-check' v-else @click="editExhibition"/>
            <Button icon="pi pi-times" v-if="!isEditing" @click="removeExhibition"/>
          </div>
        </div>
        <Toast/>
</template>

<script lang="ts" setup>
import type { Exhibition } from '~/types/exhibition';

const props = withDefaults(defineProps<{
    exhibition:Exhibition,
    initialEditing?:boolean
}>(), {
    initialEditing:false
})
const emit = defineEmits(['refreshData'])
const toast = useToast()
const showToast = (status: 'error' | 'success' ='success') => {
   if(status === 'success'){
    toast.add({ severity: 'success',  summary: 'Сохранено', detail:'Название успешно изменено', life: 3000 })
   }else{
    toast.add({ severity: 'error',  summary: 'Ошибка', detail:'Произошла ошибка', life: 3000 })
   }
}
const inputValue = ref(props.exhibition.name)
const isEditing = ref(props.initialEditing)

const changeDisable = () => {
    isEditing.value = !isEditing.value
}

const removeExhibition = async () => {
    const {error} = await useAPI<Exhibition>(`.admin/exhibitions/${props.exhibition.id}`, 
    {method:'DELETE'})

    error.value ? showToast('error') : toast.add({ severity: 'success',  summary: 'Удалено', detail:'Выставка удалена', life: 3000 })
    
    if(!error.value){
        emit('refreshData')
    }
    
}

const editExhibition = async () => {
    const {error} = await useAPI<Exhibition>(`/exhibitions/${props.exhibition.id}`, {
    method:'PATCH',
    body:{
        id:props.exhibition.id,
        name: inputValue.value
    }
    })
    error.value ?  showToast('error') : showToast()
    changeDisable()
}



</script>
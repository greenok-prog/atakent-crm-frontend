<template>
    <form @submit.prevent="addHandler" class="flex flex-col gap-2">
          
          <div class="flex items-center gap-4">
            <InputText v-model="inputValue" class="w-96" ref="inputRef" autofocus/>
            <div class="flex items-center gap-2">
              <Button icon='pi pi-check' type="submit"/>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <label>Файл билета</label>
            <input @change="event => onFileChange(event)" type="file">
        </div>
        </form>
        <Toast/>
</template>

<script lang="ts" setup>
const inputValue = ref('')
const emit = defineEmits(['onAdd', 'refreshData'])
const inputRef = ref<null | HTMLInputElement>(null)
const file = ref<File | undefined>(undefined)
const onFileChange = (event:Event) => {
  if((event.target as HTMLInputElement).files && event.target){
    file.value = event.target.files[0]
  }
}
const addHandler = () => {
  const formData = new FormData()
  formData.append('name', inputValue.value)
  if(file.value){
    formData.append('ticketImg', file.value)
  }
  emit('onAdd', formData)

}




</script>
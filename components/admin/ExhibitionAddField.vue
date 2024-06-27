<template>
    <form @submit.prevent="emit('onAdd', inputValue)" class="flex items-center gap-4">
          <InputText v-model="inputValue" class="w-96" ref="inputRef" autofocus/>
          <div class="flex items-center gap-2">
          
            <Button icon='pi pi-check' type="submit"/>
            
          </div>
        </form>
        <Toast/>
</template>

<script lang="ts" setup>
const inputValue = ref('')
const emit = defineEmits(['onAdd', 'refreshData'])
const inputRef = ref<null | HTMLInputElement>(null)




</script>
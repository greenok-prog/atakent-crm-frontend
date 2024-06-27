<template>
    <div>
      <div class="flex flex-col gap-4">
        <AdminExhibitionField v-for="exhibition in exhibitions" :key="exhibition.id" :exhibition="exhibition" @refreshData="refreshData"/>
        <AdminExhibitionAddField v-if="isAddExhibition" @onAdd="addExhibitionHandler" />
      </div>
      
      <Button class="mt-6" label="Добавить выставку" icon="pi pi-plus" @click="openAddExhibitionInput" v-if="!isAddExhibition"/>
    </div>
</template>

<script lang="ts" setup>
import type { Exhibition } from '~/types/exhibition';

definePageMeta({
  layout: 'admin-layout'
})
const {data:exhibitions, refresh:refreshData} = await useAPI<Exhibition[]>('/exhibitions')

const isAddExhibition = ref(false)

const openAddExhibitionInput = () => {
  isAddExhibition.value = true
}

const addExhibitionHandler = async (name:string) => {
  const {error} = await useAPI<Exhibition>('/exhibitions', {
    method:'POST',
    body:{
      name
    }
  })
  if(!error.value){
    
    refreshData()
    isAddExhibition.value = false
  }
}

</script>
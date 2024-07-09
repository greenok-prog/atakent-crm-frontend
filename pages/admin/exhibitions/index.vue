<template>
    <div>
      <div class="flex flex-col gap-4 max-w-1/5">
        <AdminExhibitionField v-for="exhibition in exhibitions" :key="exhibition.id" :exhibition="exhibition"/>
        <AdminExhibitionAddField v-if="isAddExhibition" @onAdd="addExhibitionHandler" />
      </div>
      
      <Button class="mt-6" label="Добавить выставку" icon="pi pi-plus" @click="openAddExhibitionInput" v-if="!isAddExhibition"/>
    </div>
</template>

<script lang="ts" setup>
import { useExhibitionsStore } from '~/store/exhibitions.store';

definePageMeta({
  layout: 'admin-layout'
})
const {getExhibitions, addExhibition} = useExhibitionsStore()
const {exhibitions} = storeToRefs(useExhibitionsStore())
await getExhibitions()

const isAddExhibition = ref(false)

const openAddExhibitionInput = () => {
  isAddExhibition.value = true
}

const addExhibitionHandler = async (data:any) => {
  const res = await addExhibition(data)
  if(!res.error.value){
    isAddExhibition.value = false
  }
}

</script>
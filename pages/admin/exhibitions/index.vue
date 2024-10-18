<template>
  <Tabs value="0">
    <TabList>
        <Tab value="0">Список выставок</Tab>
        <Tab value="1">Варианты источников</Tab>
    </TabList>
    <TabPanels>
        <TabPanel value="0">
          <div>
        <div class="flex flex-col gap-4 w-92">
          <AdminExhibitionField v-for="exhibition in exhibitions" :key="exhibition.id" :exhibition="exhibition"/>
          <AdminExhibitionAddField v-if="isAddExhibition" @onAdd="addExhibitionHandler" />
        </div>
        
        <Button class="mt-6" label="Добавить выставку" icon="pi pi-plus" @click="openAddExhibitionInput" v-if="!isAddExhibition"/>
      </div>
        </TabPanel>
        <TabPanel value="1" >
          <div class="w-96">
            <div class="card flex gap-2 items-center">
              <Chip :label="chip.name" removable v-for="chip in sources" @remove="removeSource(chip.id)" :key="chip.id" />
             
           </div>
          <div class="flex gap-2 w-full mt-4">
            <BaseInput placeholder="Новый вариант" v-model="chipInput"/>
            <Button icon="pi pi-plus" @click="addChip(chipInput)"/>
          </div>
          </div>
        </TabPanel>
    </TabPanels>
</Tabs>
</template>

<script lang="ts" setup>
import { useExhibitionsStore } from '~/store/exhibitions.store';

definePageMeta({
  layout: 'admin-layout'
})
const {data:sources, refresh} = await useAPI('/sources')
const addChip = async (name:string) => {
  const {error} = await useAPI('/sources', {
    method:'POST',
    body:{
      name
    }
  })
  if(!error.value){
    chipInput.value = ''
    refresh()
  }
}
const removeSource = async (id:number) => {
  const {error, refresh} = await useAPI(`/sources/${id}`, {
    method:'DELETE'
  })
  if(!error.value){
    refresh()
  }
}
const {getExhibitions, addExhibition} = useExhibitionsStore()
const {exhibitions} = storeToRefs(useExhibitionsStore())
await getExhibitions()

const isAddExhibition = ref(false)
const chipInput = ref('')
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
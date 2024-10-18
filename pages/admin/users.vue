<template>
   
  
    <div class="h-full">
      <DataTable :value="formatedData" ref="dt" scrollable  paginator size="small" :rows="10" class="h-full">

      <template #header>
          <div class="flex flex-col gap-1">
            <span class="text-base ">Количество: <b>{{ usersCount }}</b></span>
            <div class="flex items-end justify-between ">
           
           <div class="flex items-end gap-2">
             <Select :options="exhibitions" v-model="sortExhibition" showClear  optionLabel="name" optionValue="id" placeholder="Выбрать выставку" class="w-64"    />
             <Select :options="sources" v-model="sortSource" showClear  optionLabel="name" optionValue="name" placeholder="Информация" class="w-64"    />
             <div class="flex flex-col">
              <label for="selectDatePicker">Дата регистрации</label>
              <DatePicker v-model="dates" selectionMode="range" id="selectDatePicker" showButtonBar  />
             </div>
             
              
            
        
      
           </div>
           <Button icon="pi pi-external-link" label="Экспорт" @click="(event:any) => exportCSV()" />
         </div>
          </div>
      </template>
<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
<Column field="name" header="Имя" style="min-width: 200px"></Column>

<Column field="phone" header="Номер" style="min-width: 200px"></Column>
<Column field="email" header="Email" style="min-width: 200px"></Column>
<Column field="executor" header="Лицо" style="min-width: 130px"></Column>
<Column field="exhibition" header="Выставка" style="min-width: 170px"></Column>
<Column field="fair" header="Информация" style="min-width: 200px"></Column>
<Column field="country" header="Страна/город" style="min-width: 200px"></Column>
<Column field="companyName" header="Название компании" style="min-width: 200px"></Column>

<Column field="qr" header="Статус" style="min-width: 150px">
  <template #body="slotProps">
    <Tag :severity="getStatusColor(slotProps.data.qr)" :value="slotProps.data.qr ? 'Посетил' : 'Не посетил'"/>
  </template>
</Column>

<Column field="date" header="Дата регистрации"></Column>
</DataTable>
    </div>
   
</template> 

<script lang="ts" setup>
import type { Exhibition } from '~/types/exhibition';
import type { Source, Visitor } from '~/types/visitor';

definePageMeta({
  layout: 'admin-layout',
  middleware:'auth',
})
const page = useNuxtApp()

const {data:exhibitions} = await useAPI<Exhibition[]>(`/exhibitions`)
const {data:sources} = await useAPI<Source>('/sources')
const sortExhibition = ref('')
const sortSource = ref('')
const dates = ref<null | Date[]>(null)

const clearDates = () => {
  dates.value = null
}

const queries = computed(() => {
  interface QueryType{
    exhibition?:string,
    fair?:string,
    registrationDateStart?:string,
    registrationDateEnd?:string
  }
  const queryObject:QueryType = {}
  if(sortExhibition.value){
    queryObject['exhibition'] = sortExhibition.value
  }
  if(sortSource.value){
    queryObject['fair'] = sortSource.value
  }
  
  if(dates.value && dates.value[1] && dates.value[0]){
    const firstDate = new Date(dates.value[0])
    const lastDate = new Date(dates.value[1])
    lastDate.setDate(lastDate.getDate() + 1)
    
    queryObject['registrationDateStart'] = firstDate.toISOString()
    queryObject['registrationDateEnd'] = lastDate.toISOString()
  }
  return queryObject
})
const {data} = await useAPI<Visitor[]>(`/visitors`, {
  query:queries

})
const usersCount = computed(() => data.value?.length)
const formatedData = computed(() => {
  return data.value?.map(visitor => {
    return {
      ...visitor,
      exhibition:visitor.exhibiton.name,
      date: new Date(visitor.date).toLocaleString('ru'),
      executor: visitor.executor === 'individual' ? 'Частное лицо' : 'Юридическое лицо'
    }
  })
})
const dt = ref();
const exportCSV = () => {
    dt.value.exportCSV();
};

const getStatusColor = (status:boolean) => {
  switch (status){
    case true:
      return 'success'
    case false:
      return 'danger'
    default:
      return null
  }
}

</script>
<template>
   
  
    <div class="">
      <DataTable :value="formatedData" ref="dt" scrollable  paginator size="small" :rows="10" >

<template #header>
          <div class="flex items-center justify-between ">
            <Select :options="exhibitions" v-model="sortExhibition" showClear  optionLabel="name" optionValue="id" placeholder="Выбрать выставку" class="w-64"    />
            <Button icon="pi pi-external-link" label="Экспорт" @click="(event:any) => exportCSV()" />
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
import type { Visitor } from '~/types/visitor';

definePageMeta({
  layout: 'admin-layout'
})

const {data:exhibitions} = await useAPI<Exhibition[]>(`/exhibitions`)
const sortExhibition = ref('')

const queries = computed(() => {
  interface QueryType{
    exhibition?:string
  }
  const queryObject:QueryType = {}
  if(sortExhibition.value){
    queryObject['exhibition'] = sortExhibition.value
  }
  return queryObject
})
const {data} = await useAPI<Visitor[]>(() => `/visitors`, {
  query:queries

})
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
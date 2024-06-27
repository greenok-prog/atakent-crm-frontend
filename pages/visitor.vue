<template>
    <form class="w-1/3 flex flex-col gap-6" @submit="submitHandler">
       <div class="flex flex-col gap-2">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="">Выберите выставку</label>
                <Select class="w-full" placeholder="Выберите выставку" v-model="exhibition" v-bind="exhibitionAttrs" :options="exhibtions" optionLabel="name" optionValue="id"/>
                <small v-if="errors.exhibition" class="text-red-500">{{ errors.exhibition }}</small>
            </div>
        </div>
        <div class="grid grid-cols-2 items-start gap-4 justify-between">
            <BaseInput v-model="name" v-bind="nameAttrs" :errorMessage="errors.name" label="Имя" class="w-full"/>
            <BaseInputMask v-model="phone" v-bind="phoneAttrs" :errorMessage="errors.phone" label="Номер телефона" class="w-full"/>
        </div>
        <div class="flex items-center gap-4 justify-between">
            <BaseInput v-model="email" v-bind="emailAttrs" :errorMessage="errors.email" type="email" label="Email" class="w-full"/>
        </div>
        <BaseInput v-model="fair" v-bind="fairAttrs" :errorMessage="errors.fair" label="Откуда вы узнали о выставке"/>
       </div>
       <div class="flex flex-col gap-2">
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="">Специалист или частное лицо</label>
                <Select class="w-full" placeholder="Выберите" v-model="executor" v-bind="executorAttrs" :options="executorOptions" optionLabel="title" optionValue="name"/>
                <small v-if="errors.executor" class="text-red-500">{{ errors.executor }}</small>
            </div>
            
        </div>
        <div v-if="executor === 'company'" class="grid grid-cols-2 items-center gap-4 justify-between">
                <BaseInput v-model="companyName" v-bind="companyNameAttrs" :errorMessage="errors.companyName" label="Название компании" class="w-full"/>
                <BaseInput v-model="country" v-bind="countryAttrs" :errorMessage="errors.country" label="Страна/город" class="w-full"/>
            </div>
       </div>
       <Button label="Получить билет" type="submit"/>
    </form>
    <DownloadTicketDialog v-if="responseData" v-model="dialogStatus" :ticketUrl="responseData.qrValue" :visitorId="responseData.id"/>
</template>


<script lang="ts" setup>
import type { Exhibition } from '~/types/exhibition';
import * as yup from 'yup'
import type { Visitor } from '~/types/visitor';

const config = useRuntimeConfig()
const dialogStatus = ref(false)
const {data:exhibtions} = await useAPI<Exhibition[]>('/exhibitions')

const executorOptions = [
    {id:0, name:'individual', title:'Частное лицо'},
    {id:1, name: 'company', title:'Специалист'}
]

const validationSchema = yup.object({
    name:yup.string().required('Обязательное поле'),
    email:yup.string().required('Обязательное поле').email('Неверный формат Email'),
    phone:yup.string().required('Обязательное поле'),
    fair:yup.string().required('Обязательное поле'),
    exhibition:yup.string().required('Обязательное поле'),
    executor:yup.string().required('Обязательное поле').is(['individual', 'company'], 'Обязательное поле'),
    country:yup.string(),
    companyName:yup.string()

})

const {errors, handleSubmit, defineField, values} = useForm({
    initialValues:{
        name:'',
        email:'',
        phone:'',
        fair:'',
        exhibition:'',
        executor:'',
        country:'',
        companyName:''
    },
    validationSchema
})

const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [phone, phoneAttrs] = defineField('phone')
const [exhibition,exhibitionAttrs] = defineField('exhibition')
const [fair, fairAttrs] = defineField('fair')
const [executor, executorAttrs] = defineField('executor')
const [country, countryAttrs] = defineField('country')
const [companyName, companyNameAttrs] = defineField('companyName')

const responseData = ref<null | Visitor>(null)
const submitHandler = handleSubmit(async () => {
    const {data} = await useAPI<Visitor>('/visitors', {
        method:'POST',
        body:values
    })
    dialogStatus.value = true
    responseData.value = data.value
    
    
    
})

</script>
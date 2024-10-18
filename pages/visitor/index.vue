<template>
    <div class="min-h-svh h-full flex items-center justify-center p-3 main">
        <div class="flex flex-col  w-full sm:w-2/3 md:w-4/5 xl:w-[800px]">
            <!-- <h1 class="text-center mb-2 text-3xl font-bold">Регистрация посетителя</h1> -->
            <div class="rounded-2xl drop-shadow-2xl bg-gray-50/70  p-4   ">
            <form class="w-full flex flex-col gap-6" >
        <div class="flex flex-col gap-2">
            <div class="grid  gap-4 md:grid-cols-2 grid-cols-1">
                <div class="w-full">
                    <label for="">Выберите выставку</label>
                    <Select  class="w-full" placeholder="Выберите выставку" v-model="exhibition" v-bind="exhibitionAttrs" :options="exhibtions" optionLabel="name" optionValue="id"/>
                    <small v-if="errors.exhibition" class="text-red-500">{{ errors.exhibition }}</small>
                </div>
            </div>
            <div class="grid md:grid-cols-2 grid-cols-1 items-start gap-4 justify-between">
                <BaseInput v-model="name" v-bind="nameAttrs" :errorMessage="errors.name" label="Имя" class="w-full"/>
                <BaseInputMask v-model="phone" v-bind="phoneAttrs" :errorMessage="errors.phone" label="Номер телефона" class="w-full"/>
            </div>
            <div class="flex items-center gap-4 justify-between">
                <BaseInput v-model="email" v-bind="emailAttrs" :errorMessage="errors.email" type="email" label="Email" class="w-full"/>
            </div>
            
        </div>
        <div class="flex flex-col gap-2">
            <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div class="flex flex-col">
                    <label for="">Откуда вы узнали о выставке</label>
                    <Select :options="sources" optionLabel="name" optionValue="name" v-model="fair" v-bind="fairAttrs" :errorMessage="errors.fair" :disabled="isFairDisabled" label="Откуда вы узнали о выставке"/>
                    <small v-if="errors.fair" class="text-red-500">{{ errors.fair }}</small>
                </div>
                <div>
                    <label for="">Специалист или частное лицо</label>
                    <Select class="w-full" placeholder="Выберите" v-model="executor" v-bind="executorAttrs" :options="executorOptions" optionLabel="title" optionValue="name"/>
                    <small v-if="errors.executor" class="text-red-500">{{ errors.executor }}</small>
                </div>
                
            </div>
            <div v-if="executor === 'company'" class="grid md:grid-cols-2 grid-cols-1 items-center gap-4 justify-between">
                    <BaseInput v-model="companyName" v-bind="companyNameAttrs" :errorMessage="errors.companyName" label="Название компании" class="w-full"/>
                   <div>
                    <label for="">Страна</label>
                    <Select :options="countries" v-model="country" editable  optionLabel="name" optionValue="name" v-bind="countryAttrs" :errorMessage="errors.country" label="Страна/город" class="w-full"/>
                   </div>
                </div>
        </div>
            <Button label="Получить билет" type="submit" @click="submitHandler"/>
            </form>
        </div>
        </div>
    </div>
    <DownloadTicketDialog v-if="responseData" v-model="dialogStatus" :ticketUrl="responseData.qrValue" :visitorId="responseData.id"/>
    <BaseLoader v-if="isDataLoading"/>
</template>


<script lang="ts" setup>
import type { Exhibition } from '~/types/exhibition';
import * as yup from 'yup'
import type { Source, Visitor } from '~/types/visitor';

const config = useRuntimeConfig()
const dialogStatus = ref(false)
const {data:exhibtions} = await useAPI<Exhibition[]>('/exhibitions')
const {data:countries} = await useFetch(`https://data-api.oxilor.com/rest/countries?key=${config.public.countryKey}&lng=ru`)

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

const {errors, handleSubmit, defineField, values, resetForm} = useForm({
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

const isFairDisabled = ref(false)

const isDataLoading = ref(false)
const responseData = ref<null | Visitor>(null)

const submitHandler = handleSubmit(async () => {
    if (isDataLoading.value) return; // предотвратить множественные запросы

    isDataLoading.value = true;
    try {
        const data = await usePostAPI<Visitor>('/visitors', {
            method: 'POST',
            body: values,
        });
        responseData.value = data;
        dialogStatus.value = true;
        resetForm();
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        // Обработайте ошибку
    } finally {
        isDataLoading.value = false;
        
    }
});
const route = useRoute()
const {data:sources} = await useAPI<Source[]>('/sources')

onMounted(() => {
    if(route.query.fair && sources.value){
        const selectedSource =  sources.value.find(el => el.name === route.query.fair)
        if(selectedSource){
            fair.value = selectedSource.name
            isFairDisabled.value = true
        }
    }
})

</script>

<style lang="scss" scoped>

</style>
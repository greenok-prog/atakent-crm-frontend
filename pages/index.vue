<template>
   <div class="flex flex-col justify-between min-h-svh">
    
   <div>
    <header class="h-16 drop-shadow-xl w-full border bg-black text-white text-lg font-bold flex items-center px-6">
        Header
    </header>
   
    
    <div class="flex items-center justify-center min-w-92">
        <form action="" class="mt-12" @submit.prevent="submit">
        <h1 class="text-3xl font-bold pb-6">Регистрация участника</h1>

        <div class=" min-h-72 flex flex-col ">
                <span class="mt-1">Выберите выставку, на которой компания будет учавствовать</span>
                <Select v-model="exhibitionId" :options="exhibitions" optionLabel="name" optionValue="id" placeholder="Выберите выставку" class="mt-4 max-w-72"/>
                <div v-if="exhibitionId" class=' flex flex-col gap-4 mt-6  w-full '>
                        <BaseInput class="w-full" v-model="companyName" v-bind="companyNameAttrs" :error-message="errors.companyName" placeholder="Название компании"/>
                        <BaseInput v-model="email" v-bind="emailAttrs" :error-message="errors.email" placeholder="Email"/>
                        <BaseInputMask v-model="companyPhone" v-bind="companyPhoneAttrs" :error-message="errors.companyPhone" placeholder="Номер телефона" />
                        <FileInput :file="file" label="Загрузить логотип" @onChangeFile="addFile"/>
                </div>
                <div class="flex flex-col w-full mt-4">
                        <h2 class="text-2xl  font-bold">Социальные сети</h2>
                        <span class="mt-1">Добавьте ссылки на социальные сети</span>
                        <div class=' flex flex-col gap-4 mt-6 '>
                            <BaseInput v-model="website" v-bind="websiteAttrs" :error-message="errors.website" placeholder="Сайт"/>
                            <BaseInput v-model="youtube" v-bind="youtubeAttrs" :error-message="errors.youtube" placeholder="Instagram"/>
                            <BaseInput v-model="instagram" v-bind="instagramAttrs" :error-message="errors.instagram" placeholder="Youtube"/>
                            <BaseInput v-model="facebook" v-bind="facebookAttrs" :error-message="errors.facebook" placeholder="Facebook" />
                        </div>
                        
                        <VeeFieldArray name="employees" v-slot="{ fields, push, remove }" >
                            <div class="flex justify-between items-end" v-for="(field, idx) in fields" :key="field.key" >
                            <div class="flex gap-3">
                                <BaseInput v-model="employees[idx].name" label="ФИО" class="w-96" reqired/>
                                <BaseInput v-model="employees[idx].position" label="Должность" class="w-56" reqired/>
                            </div>
                            <Button v-if="!field.isFirst" icon="pi pi-times" @click="remove(idx)"/>
                        </div>
                      
                   
                    <div class="flex">
                        <Button label="Добавить участника" icon="pi pi-plus" @click="push({name:'', position:''})" class="mt-4"/>
                    </div>
                </VeeFieldArray>
                    </div>
                
              </div>
      
</form>
    </div>
   </div>
    <Toast/>


    <footer class="h-24 drop-shadow-xl w-full border bg-black text-white text-lg font-bold flex items-center px-6 mt-4">
        Footer
    </footer>
   </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'


const {data:exhibitions} = await useAPI('/exhibitions')

const toast = useToast()

const setToast = (status: 'success' | 'error') => {
    if(status === 'success'){
        toast.add({life:3000, severity:'success', summary:'Создано', detail:'Запись об участнике успешно создана'})
    }else{
        toast.add({life:3000, severity:'error', summary:'Ошибка', detail:'Проверьте верность заполненых полей'})
    }
}

const validationSchema = yup.object().shape({
    exhibitionId:yup.number(),
    companyName:yup.string().required('Обязательное поле'),
    email: yup.string().email('Невалидный email').required('Обязательное поле'),
    companyPhone:yup.string().required('Обязательное поле'),
    website:yup.string(),
    instagram:yup.string(),
    youtube:yup.string(),
    employees: yup.array().of(
        yup.object().shape({
            name:yup.string().required('Обязательное полz'),
            position:yup.string().required('Необходимо добавить хотя бы одного участника')
        })
    ).strict()
    
    
})

const {defineField, values, errors, submitForm, validate} = useForm({
    validationSchema,
    initialValues:{
        companyName:'',
        email: '',
        companyPhone: '',
        exhibitionId:'',
        employees:[{
            name:'',
            position:''
        }],
        youtube:'',
        instagram:'',
        website:'',
        facebook:''
    }
})
const [companyName, companyNameAttrs] = defineField('companyName')
const [email, emailAttrs] = defineField('email')
const [companyPhone, companyPhoneAttrs] = defineField('companyPhone')
const [exhibitionId] = defineField('exhibitionId')
const [youtube, youtubeAttrs] = defineField('youtube')
const [instagram, instagramAttrs] = defineField('instagram')
const [facebook, facebookAttrs] = defineField('facebook')
const [website, websiteAttrs] = defineField('website')
const [employees, employeesAttrs] = defineField('employees')


const selectedFiles = ref<HTMLInputElement | null>(null)
const file = ref<File | undefined>(undefined)
const fileError = ref('')

const addFile = (event:InputEvent) => {
    fileError.value = ''
    if(event.target){
        const files = event.target?.files
        let selectedFile = files[0]
        const fileUrl = URL.createObjectURL(selectedFile)

        const img = new Image()

        img.src = fileUrl
        img.onload = function(){
            const width = this.naturalWidth
            const height = this.naturalHeight
        }

        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
        
        if(!allowedExtensions.exec(selectedFile.name)){
            fileError.value = 'Необходимо загрузить картинку'
            return 
        }
        file.value = selectedFile
    }
}

const submit = async () => {
    const isValidForm = (await validate()).valid
    console.log(errors.value);
    
    
    if(isValidForm){
        const formData = new FormData()
        formData.append('logo',file.value)
        const requestData = {
            ...values,
            exhibitionId:exhibitionId.value,
            employees:employees.value,
        }
        for (const [key, value] of Object.entries(requestData)) {
                if (key === 'employees') {
                    formData.append(key, JSON.stringify(value))
                } else {
                    formData.append(key, value as string)
                }
            }
            for (const value of formData.values()) {
                console.log(value);
                }
            
        const {data} = await useAPI('/exhibitors', {
            method:'POST',
            body:formData,
        })
        setToast('success')
    }else{
        setToast('error')
    }
    
    
    
  
    
}

</script>

<style>

</style>
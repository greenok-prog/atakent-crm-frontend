<template>
    <div class="flex items-center justify-center min-h-svh">
        <div class="w-96">
            <h1 class="text-center text-2xl font-bold">Вход в систему</h1>
            <form class="flex flex-col gap-4 w-full mt-4" @submit="login">
                <BaseInput v-model="email" placeholder="email" type="email"/>
                <BaseInput v-model="password" placeholder="Пароль" type="password"/>
                <Button type="submit" label="Войти"/>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '~/store/user.store';
import type { AuthResponse } from '~/types/user';

const {defineField, values,handleSubmit} = useForm()
const [email] = defineField('email')
const [password] = defineField('password')
const {login:loginUser} = useUserStore()
const {user} = storeToRefs(useUserStore())
getTitleByRoute()
const page = useNuxtApp()


const config = useRuntimeConfig()
const login = handleSubmit(async () => {
    const {data, error} = await useFetch<AuthResponse>(config.public.baseUrl + '/auth/login', {
        method:'POST',
        body:values,
    })
    if(error.value){
        return 'error'    
    }
    if(data.value?.access_token){
        loginUser(data.value)
        return await navigateTo('/admin')
    }
    return 
})

</script>
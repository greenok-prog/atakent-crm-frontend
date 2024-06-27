<template>
    <aside class="sidebar min-w-72">
       <div class="py-6 px-4">
       <div>
        <h2 class="text-xl font-bold">Atakent-CRM</h2>
        <nav class="flex flex-col  mt-6">
            <NuxtLink to="/admin/stands" class="flex gap-2 p-2 items-center hover:bg-zinc-800 hover:text-white rounded group transition">
                <SvgoStands class="h-5 group-hover:fill-white"/>
                Стенды
            </NuxtLink>
            <NuxtLink to="/admin/users" class="flex gap-2 p-2 items-center hover:bg-zinc-800 hover:text-white rounded group transition">
                <SvgoUserGroup class="h-5 group-hover:fill-white"/>
                Список посетителей
            </NuxtLink>
        </nav>
       </div>

        <div class="mt-12">
            <p class="text-lg font-bold">Выставки:</p>
            <nav class="flex flex-col  mt-4">
                <NuxtLink to="/admin/exhibitions/FIW" class="flex gap-2 p-2 items-center hover:bg-zinc-800 hover:text-white rounded group transition">
                <SvgoStands class="h-5 group-hover:fill-white"/>
                FIW
            </NuxtLink>
            <NuxtLink to="/admin/exhibitions" class="flex gap-2 p-2 items-center hover:bg-zinc-800 hover:text-white rounded group transition">
                <SvgoUserGroup class="h-5 group-hover:fill-white"/>
                Список выставок 
            </NuxtLink>
            </nav>
        </div>
       </div>   
    </aside>
</template>
<script lang="ts" setup>
import SvgoUserGroup from '@/assets/icons/user-group.svg'
import SvgoStands from '@/assets/icons/stands.svg'

</script>
<style lang="scss" scoped>
.sidebar{
    min-height: 100vh;
    box-shadow:  rgba(0, 0, 0, 0.15) 0px 5px 25px 0px;
}
.router-link-exact-active{
    @apply bg-zinc-800 text-white rounded
}
.router-link-exact-active svg{
    @apply fill-white
}

</style>
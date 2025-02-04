<template>

    <aside
        class="sidebar min-w-72 bg-gradient-to-r from-indigo-700 to-indigo-500 flex flex-col justify-between overflow-hidden">
        <div class="py-6 px-4">
            <div>
                <h2 class="text-2xl font-bold text-white pl-2">Atakent-CRM</h2>
                <nav class="flex flex-col  mt-6 gap-2">
                    <NuxtLink to="/admin/stands"
                        class="flex gap-2 p-2 items-center hover:bg-indigo-500 hover:text-white rounded group transition text-white font-light">
                        <!-- <SvgoStands class="h-5 fill-white"/> -->
                        Стенды
                    </NuxtLink>
                    <NuxtLink to="/admin/users"
                        class="flex gap-2 p-2 items-center hover:bg-indigo-500 hover:text-white rounded group transition text-white font-light">
                        <!-- <SvgoUserGroup class="h-5 fill-white"/> -->
                        Список посетителей
                    </NuxtLink>
                </nav>
            </div>

            <div class="mt-2" v-if="userIsAdmin">

                <nav class="flex flex-col  gap-2">

                    <NuxtLink to="/admin/exhibitions"
                        class="flex gap-2 p-2 items-center hover:bg-indigo-500 hover:text-white rounded group transition text-white font-light">
                        <!-- <SvgoUserGroup class="h-5 fill-white "/> -->
                        Список выставок
                    </NuxtLink>
                    <NuxtLink to="/admin/managers"
                        class="flex gap-2 p-2 items-center hover:bg-indigo-500 hover:text-white rounded group transition  text-white font-light">
                        <!-- <SvgoUserGroup class="h-5 fill-white "/> -->

                        Пользователи
                    </NuxtLink>
                </nav>
            </div>
        </div>

    </aside>
</template>
<script lang="ts" setup>

    import { useUserStore } from '~/store/user.store';

    const { userIsAdmin } = storeToRefs(useUserStore())
</script>
<style lang="scss" scoped>
.sidebar {
    min-height: 100vh;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 25px 0px;
}

.router-link-exact-active {
    @apply bg-indigo-500 text-white rounded font-normal
}

.router-link-exact-active svg {
    @apply fill-white
}
</style>
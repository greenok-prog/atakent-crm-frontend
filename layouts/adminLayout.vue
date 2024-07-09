<template>
    <div class="flex gap-6 oveflow-hidden">
        <AdminLayoutSidebar/>
        <div class="flex-grow flex flex-col pb-6 pr-6 gap-4 oveflow-hidden w-max-96 w-4/5">
            <Header/>
            <main class="main grow rounded-xl px-4 py-6 oveflow-hidden w-max-96" >
                <NuxtPage/>
            </main>
        </div>
    </div>
    <BaseLoader v-if="loading"/>
</template>
<script lang="ts" setup>
const nuxtApp = useNuxtApp();
const loading = ref(false);
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>
<style lang="scss" scoped>
.main{
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

</style>
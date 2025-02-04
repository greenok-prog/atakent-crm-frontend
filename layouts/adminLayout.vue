<template>
    <div class="flex min-h-svh bg-indigo-50 ">

        <AdminLayoutSidebar />

        <div class="flex flex-col grow container">
            <main class="overflow-hidden ">
                <div class=" py-6 px-4 overflow-hidden">
                    <NuxtPage />
                </div>
            </main>
        </div>
    </div>

</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>

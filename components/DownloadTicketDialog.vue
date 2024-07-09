<template>
    <Dialog v-model:visible="model" modal header="Электронный пропуск" class="w-full md:w-2/3 sm:w-full xl:w-1/3">
        
        <div class="w-full flex justify-center ">
            <ServerImage v-if="model" :src="ticketUrl"  class="w-2/3 md:w-2/5 border"/>
        </div>
        <div class="flex flex-col gap-2 mt-4">
            <span class="text-md">Держите ваш QR для посещения выставки</span>
            <span>QR Поднесите фото к сканеру турникета чтобы пройти дальше и получить бейдж</span>
        </div>
        <Button label="Скачать билет на устройство" @click="downloadTicket" class="mt-4"/>
    </Dialog>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
const model = defineModel()
const props = defineProps<{
    ticketUrl:string,
    visitorId:number
}>()
const downloadTicket = async () => {
    const {data} = await useAPI(`/visitors/${props.visitorId}/ticket`)
    downloadFileHandler(data.value, 'Электронный пропуск.png')
}
await downloadTicket()
</script>
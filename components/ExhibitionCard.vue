<template>
    <div class="card rounded shadow-xl ">
        <div class="relative ">
            <div
                class="absolute l-0 t-0 bg-indigo-600   rounded-br-2xl rounded-tl-xl w-32 flex justify-between py-2 px-2">
                <p class="flex flex-col items-center text-white font-bold">
                    <span class="leading-none">Февр.</span>
                    <span class="text-4xl leading-none">12</span>
                </p>
                <div class="text-white text-2xl">-</div>
                <p class="flex flex-col items-center text-white font-bold">
                    <span class="text-sm leading-none">Февр.</span>
                    <span class="text-2xl leading-none">12</span>
                </p>

            </div>
            <NuxtImg :src="`${config.public.baseUrl}/${exhibition.image}`"
                class="h-32 w-full  object-cover rounded-t-xl" />
        </div>
        <div class="p-2 flex flex-col ">
            <p class="text-lg font-bold text-gray-700">{{ exhibition.name }}</p>
            <p class="text-sm flex items-center mt-2 gap-2 bg-gray-100 rounded-xl py-1 px-2 w-fit">
                <Icon name="ic:baseline-calendar-month" class="mb-1" />
                <span class="one-line">{{ exhibitionDateString }}</span>
            </p>
            <p class="text-sm flex items-center mt-2 gap-2 bg-gray-100 rounded-xl py-1 px-2 w-fit">
                <Icon name="ic:baseline-place" />
                <span class="one-line">{{ exhibition.location }}</span>
            </p>
            <NuxtLink :to="`visitor?exhibition=${exhibition.id}`" class="mt-4 w-full flex flex-col">
                <Button label="Получить билет" />
            </NuxtLink>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import type { Exhibition } from '~/types/exhibition';
    const config = useRuntimeConfig()
    const { exhibition } = defineProps<{
        exhibition: Exhibition
    }>()

    const exhibitionDateString = computed(() => {
        const exhibitionStart = formatExhibitionDate(new Date(exhibition.dateStart))
        const exhibitionEnd = formatExhibitionDate(new Date(exhibition.dateEnd), false)
        return `${exhibitionStart} - ${exhibitionEnd}`
    })


</script>
<style lang="scss" scoped>
.one-line {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* Ограничивает текст двумя строками */
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
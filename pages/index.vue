<script setup lang="ts">



</script>

<template>
    <div class="w-full ">
        <div class="w-full h-[32rem] bg-cover  bg-[url(/exhibition-1.jpg)] custom-bg relative ">
            <div class="container m-auto py-4 relative h-full">
                <div class="absolute  h-full ">
                    <div class="h-full w-full flex  justify-center flex-col">
                        <h1 class="text-white text-4xl font-bold  mb-6"><span class="text-indigo-500">Организация</span>
                            и <span class="text-indigo-500">проведение</span>
                            выставок, <br>
                            ярмарок и конференций</h1>
                        <span class="text-white text-lg">Международная выставочная компания «Атакент-Экспо» — дочернее
                            предприятие
                            <br>АО КЦДС «Атакент»,
                            успешно осуществляет свою деятельность с 1995 года <br> и на сегодняшний день является одной
                            из
                            ведущих компаний в сфере выставочного бизнеса. </span>
                        <div class="block mt-10 flex gap-4">
                            <Button label="Календарь выставок" class=" w-48" />
                            <Button label="Получить билет" class=" w-48" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container m-auto">
            <section class="mt-10">
                <div class="flex items-center justify-between w-full border-b pb-2">
                    <h1 class="font-bold text-3xl text-gray-700">Наши выставки</h1>
                    <Button>
                        Все выставки
                        <Icon name="ic:baseline-arrow-forward" />
                    </Button>
                </div>
                <div class="grid grid-cols-6 mt-6 gap-8" v-if="exhibitions">
                    <ExhibitionCard v-for="i in exhibitions" :exhibition="i" :key="i" />

                </div>
            </section>
            <section
                class=" mt-10 bg-indigo-500 w-full bg-center object-contain bg-cover  bg-[url(/booth-stand.jpg)] bg-no-repeat">
                <div class="text-white px-10 py-12">
                    <h2 class="text-3xl font-bold">Строительство выставочных <br> стендов</h2>
                    <p class="mt-4">Компания предоставляет полный комплекс услуг и работ для организации выставочного
                        пространства:
                        <br>
                        дизайн, проектирование, изготовление, оформление и монтаж стендов любой сложности; <br>
                        предоставление в аренду аудио-, видео-, проекционного, презентационного и прочего необходимого
                        <br>
                        выставочного оборудования не только на территории КЦДС «Атакент», но и по всему Казахстану.
                    </p>
                    <Button class="mt-8">Оставить заявку</Button>
                </div>
            </section>
            <section class="mt-10">
                <h1 class="font-bold text-3xl text-gray-700">Посетителям</h1>
                <div
                    class="grid grid-cols-5 gap-8 mt-4 rounded-xl inset-shadow-2xs shadow-2xl inset-shadow-sm py-4 px-2 items-center">
                    <p class="col-span-4   ">Организаторы выставок предлагают
                        заранее
                        заполнить регистрационную форму и
                        получить бесплатный
                        электронный пригласительный билет.
                        Предварительная регистрация избавит от необходимости стоять в очереди и позволит сэкономить
                        время.
                        <span class="block font-bold mt-2">* Вы можете зарегестрироваться на нашем сайте или
                            воспользоваться чат
                            ботов Whatsapp
                        </span>
                    </p>
                    <div class=" col-span-1   text-center flex flex-col items-center justify-between">
                        <Button class="flex items-center">Регистрация на сайте
                            <Icon name="ic:baseline-arrow-forward" />
                        </Button>
                        <Button
                            class="block mt-2 bg-green-500 border-none flex items-center hover:border-none not(:disabled):hover:bg-green-500">Регистрация
                            Whatsapp
                            <NuxtImg class="w-5" src="icons/whatsapp-icon.svg" alt="" />
                        </Button>
                    </div>

                </div>
            </section>

        </div>
        <footer class="mt-12 bg-indigo-500 h-48 w-full">
            <div class="container m-auto text-white">footer</div>
        </footer>
    </div>
</template>
<script lang="ts" setup>
import { useExhibitionsStore } from '~/store/exhibitions.store';
import {ExhibitionsService} from '~/services/exhibition.service.ts'

const { getExhibitions } = useExhibitionsStore()
const { exhibitions } = storeToRefs(useExhibitionsStore())
const exhibitionsService = new ExhibitionsService()


await getExhibitions()



</script>
<style lang="scss" scoped>
.custom-bg::before {
    background-color: rgba(0, 0, 0, 0.562);
    content: '';
    display: block;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
}
</style>


<template>
    <div class="flex relative">
        <img src="/pavilion.webp" class="" alt="" >
        <div class="absolute p-3 w-full h-fit max-w-[600px] ">
            <div v-for="area in blocks" @click="selectArea(area)" class="absolute bg-red-500 hover:bg-red-600 cursor-pointer" :key="area.x"
            :class="{'bg-red-600': selectedArea?.name === area.name}" 
            :style="[
                {width:`${area.w}px`, height:`${area.h}px`},
                {top:`${area.y}px`, left:`${area.x}px`}
            ]"
            
            >
            
            

        </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
const selectedArea = ref(null)
const selectArea = (area) => {
    selectedArea.value = area
}

const blocks = [
    {
        name:1,
        x:14,
        y:10,
        h:174,
        w:56
    },
    {
        name:2,
        x:14,
        y:190,
        h:76,
        w:56
    },
    {
        name:3,
        x:14,
        y:274,
        h:120,
        w:56
    },
    {
        name:2,
        x:14,
        y:402,
        h:76,
        w:56
    },
    {
        name:2,
        x:14,
        y:484,
        h:76,
        w:56
    },
]

</script>
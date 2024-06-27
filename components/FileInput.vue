<template>
    <div>
        <input type="file" accept="image/*" v-bind="$attrs" @change="(event) => emit('onChangeFile', event)">
        <span v-if="error">{{ error }}</span>
        <div v-if="file">
            <img :src="url" alt="" class="w-32">
        </div>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['onChangeFile'])
const props = defineProps<{
    file: File,
    error?:string
}>()
const url = computed(() => {
    if(props.file){
        return URL.createObjectURL(props.file)
    }
})

</script>
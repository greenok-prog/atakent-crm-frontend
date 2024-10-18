<template>
    <div>
        <input ref="fileInput" class="inputfile" type="file" accept="image/*" name="file" v-bind="$attrs" @change="(event) => emit('onChangeFile', event)">
        <label @click="clickHandler" ref="fileLabel" for="file"> <Button :label="label ? label : 'Загрузить'" icon="pi pi-upload" class="min-w-52"/></label>
        <span v-if="error">{{ error }}</span>
        <span v-if="!error && file" class="ml-2 text-md font-bold">{{ file.name }}</span>
        <div v-if="file" class="mt-4">
            <img :src="url" alt="" class="w-full max-h-96 object-contain">
        </div>
    </div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['onChangeFile'])
const props = defineProps<{
    file: File,
    error?:string,
    label?:string
}>()
const url = computed(() => {
    if(props.file){
        return URL.createObjectURL(props.file)
    }
})
const fileInput = ref<HTMLInputElement | null>(null)
const fileLabel = ref<HTMLLabelElement | null>(null)
const clickHandler = () => {
    fileInput.value?.click()
}
</script>

<style scoped>
.inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}
.inputfile + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: black;
    display: inline-block;
}

.inputfile:focus + label,
.inputfile + label:hover {
    background-color: red;
}
</style>
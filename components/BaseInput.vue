<template>
    <div class="flex flex-col   ">
        <label class="text-sm" v-if="label">{{ label }}</label>
        <InputText v-model="model" v-bind="$attrs" />
        <small v-show="hasError" class="text-red-500">{{ errorMessage }}</small>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    label?:string,
    errorMessage?:string,

}>()
const model = defineModel()
const hasError = computed(() => {
    if(props.errorMessage){
        return props.errorMessage?.length > 0
    }
})

</script>
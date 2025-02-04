<template>
    <div class="flex flex-col">
        <label  class="text-sm" v-if="label">{{ label }}</label>
        <InputMask  :mask="'+7 (999) 999 99 99'" v-bind="$attrs"  v-model="model"  />
        <small v-show="errorMessage" class="text-red-500">{{ errorMessage }}</small>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    errorMessage?:string,
    label:string


}>()
const model = defineModel()

</script>

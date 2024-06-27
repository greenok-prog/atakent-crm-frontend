<template>
   <div @click="cl">
    fdf
   </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin-layout'
})


const cl = async () => {
  const data = await $fetch('http://localhost:8000/visitors/3', {
    responseType:'blob'
  })
  
  downloadFileHandler(data)
}

</script>
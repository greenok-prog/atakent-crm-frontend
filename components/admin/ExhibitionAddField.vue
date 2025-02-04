<template>
  <div class="flex flex-col gap-2">
    <div v-if="isAdding" :class="`items-${isEditing ? 'end' : 'center'} ${!isEditing ? 'flex gap-4' : ''} `">
      <AdminExhibitionForm @backHandler="emit('changeAddHandler')" @formSubmitHandler="addHandler" />

      <!-- <div class="flex items-center gap-2">
        <Button v-if="!isEditing" icon='pi pi-pencil' @click="changeDisable" />
        <Button icon="pi pi-times" v-if="!isEditing" @click="removeHandler" />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Exhibition, ExhibitionCreate } from '~/types/exhibition';
  import { useToast } from 'primevue/usetoast';
  import { ExhibitionsService } from '~/services/exhibition.service';
  import { useExhibitionsStore } from '~/store/exhibitions.store';

  const { isAdding } = defineProps<{
    isAdding: boolean
  }>()
  const toast = useToast()
  const exhibitionsService = new ExhibitionsService(toast)
  const emit = defineEmits(['refreshData', 'changeAddHandler'])

  const isEditing = ref(true)

  const changeDisable = () => {
    isEditing.value = !isEditing.value
  }
  const backHandler = () => {
    isEditing.value = false
  }
  // Change exhibition handler
  const { addExhibition } = useExhibitionsStore()
  const addHandler = async (formValues: ExhibitionCreate, exhibitionImage: any) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(formValues)) {
      formData.append(key, value);
    }
    if (exhibitionImage) {
      formData.append('image', exhibitionImage);
    }
    formData.append('website', 'fsdfsdfsdf')
    formData.append('organizer', String(formValues.organizer_id))
    // Отправка данных на сервер

    emit('changeAddHandler')
    await addExhibition(formData)


  }
</script>
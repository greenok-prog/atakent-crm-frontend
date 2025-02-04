<template>
  <AdminPageTitle title="Список выставок и варианты" />
  <Toast /> <!-- Компонент Toast для отображения уведомлений -->
  <div class="grid grid-cols-10 gap-8 wrap items-start">
    <AdminExhibitionsBlock :exhibitions="exhibitions" class="col-span-3" />
    <AdminSourcesBlock v-if="sources" :sources="sources" />
    <OrganizersBlock :organizers="organizers" />




  </div>
</template>

<script lang="ts" setup>
  import OrganizersBlock from '~/components/admin/OrganizersBlock.vue';
  import { OrganizerService } from '~/services/organizer.service';
  import { SourcesService } from '~/services/sources.service';
  import { useExhibitionsStore } from '~/store/exhibitions.store';
  import { useOrganizersStore } from '~/store/organizers.store';
  import { useSourcesStore } from '~/store/sources.store';

  definePageMeta({
    layout: 'admin-layout'
  });
  const toast = useToast();
  const organizersService = new OrganizerService(toast)
  const sourcesService = new SourcesService(toast)



  const { getExhibitions } = useExhibitionsStore()
  const { exhibitions } = storeToRefs(useExhibitionsStore())

  const { getSources } = useSourcesStore()
  const { sources } = storeToRefs(useSourcesStore())

  const { getOrganizers } = useOrganizersStore()
  const { organizers } = storeToRefs(useOrganizersStore())

  const { data: sourcesData } = await sourcesService.get()
  if (sourcesData.value) {
    getSources(sourcesData.value)
  }

  await getExhibitions()


  const { data: organizersData } = await organizersService.get()
  if (organizersData.value) {
    getOrganizers(organizersData.value)
  }







</script>
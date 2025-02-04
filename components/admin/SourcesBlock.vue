<template>
    <AdminBox class="col-span-3" title="Список вариантов">
        <div class="self-start">
            <div class="card flex gap-2 items-center">
                <Chip :label="chip.name" removable v-for="chip in sources" @remove="sourceService.remove(chip.id)"
                    :key="chip.id" />
            </div>
            <div class="flex gap-2 w-full mt-4">
                <BaseInput placeholder="Новый вариант" v-model="chipInput" />
                <Button icon="pi pi-plus" @click="addSourceHandler(chipInput)" />
            </div>
        </div>
    </AdminBox>
</template>

<script lang="ts" setup>
    import { SourcesService } from '~/services/sources.service';
    import { useSourcesStore } from '~/store/sources.store';
    import type { Source } from '~/types/source';
    const { sources } = defineProps<{
        sources: Source[]
    }>()
    const toast = useToast();
    const sourceService = new SourcesService(toast)
    const { addSource } = useSourcesStore()



    const addSourceHandler = async (name: string) => {
        const res = await sourceService.add(name, {})
        if (res?.data.value) {
            addSource(res.data.value)
            chipInput.value = ''
        }
    };
    const chipInput = ref('');
</script>
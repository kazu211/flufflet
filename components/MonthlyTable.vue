<script setup lang="ts">
import { getItems } from '~/api/fludger';
import type { Item, TransactionType } from '~/types/types';

const getColor = (type: TransactionType) => {
  switch (type) {
    case "収入":
      return "green";
    case "支出":
      return "red";
    default:
      return "grey";
  }
}

const props = defineProps<{
  month: string
}>()

const items = ref<Item[]>([]);
const loading = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  items.value = await getItems(props.month.split('-')[0], props.month.split('-')[1]);
  loading.value = false;
});

watch(props, async () => {
  loading.value = true;
  items.value = await getItems(props.month.split('-')[0], props.month.split('-')[1]);
  loading.value = false;
});

const headers = [
  { title: '日付', value: 'date', sortable: true },
  { title: '種別', value: 'type', sortable: false },
  { title: 'カテゴリ1', value: 'category1', sortable: false },
  { title: 'カテゴリ2', value: 'category2', sortable: false },
  { title: '金額', value: 'amount', sortable: true },
  { title: 'タグ', value: 'tags', sortable: false },
  { title: 'メモ', value: 'description', sortable: false },
  { title: '操作', key: 'actions', sortable: false },
]

</script>

<template>
  <v-data-table :loading="loading" :headers="headers" :sort-by="[{ key: 'date' }]" :items="items">
    <template v-slot:loading>
      <v-skeleton-loader></v-skeleton-loader>
    </template>

    <template v-slot:item.type="{ value }">
      <v-chip :color="getColor(value)">
        {{ value }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon>mdi-pencil</v-icon>
      <v-icon>mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

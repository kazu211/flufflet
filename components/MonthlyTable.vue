<script setup lang="ts">
import { useLoginUser } from '@/composables/states';
import type { Item, TransactionType } from '~/types/types';

const { getItems } = useLoginUser()

const props = defineProps<{
  month: string
}>()

const headers = [
  { title: '日付', value: 'date', sortable: true },
  { title: '種別', value: 'type', sortable: false },
  { title: 'カテゴリ1', value: 'category1', sortable: false },
  { title: 'カテゴリ2', value: 'category2', sortable: false },
  { title: '金額', value: 'amount', sortable: true },
  { title: 'メモ', value: 'description', sortable: false },
  { title: '操作', key: 'actions', sortable: false },
]

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


// TODO Map にして引き回せるようにする
const items = ref<Item[]>([]);
const item = ref<Item>();
const loading = ref<boolean>(false);
const showRegister = ref<boolean>(false);
const showDelete = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  items.value = await getItems(props.month.split('-')[0], props.month.split('-')[1]);
  loading.value = false;
});

watch(() => props.month, async () => {
  loading.value = true;
  items.value = await getItems(props.month.split('-')[0], props.month.split('-')[1]);
  loading.value = false;
});

const registerItem = (value?: Item) => {
  item.value = value;
  showRegister.value = true;
}

const saveRegisterItem = (value: Item) => {
  // FIXME: 表示月以外も追加するため修正が必要
  const index = items.value.findIndex(v => v.id === value.id);
  if (index !== -1) {
    items.value[index] = value;
  } else {
    items.value.push(value);
  }

  showRegister.value = false;
}

const deleteItem = (value: Item) => {
  item.value = value;
  showDelete.value = true;
}

const saveDeleteItem = (value: Item) => {
  const filteredItems = items.value.filter(v => v.id !== value.id);
  items.value = filteredItems;

  showDelete.value = false;
}

</script>

<template>
  <v-data-table :loading="loading" :headers="headers" :sort-by="[{ key: 'date' }]" :items="items">
    <template v-slot:top>
      <v-toolbar color="surface">
        <v-spacer></v-spacer>
          <v-btn color="primary" v-bind="props" @click="registerItem()">
            追加
          </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:loading>
      <v-skeleton-loader></v-skeleton-loader>
    </template>

    <template v-slot:item.type="{ value }">
      <v-chip :color="getColor(value)">
        {{ value }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon @click="registerItem(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
  <register-dialog :show="showRegister" :item="item" @save="saveRegisterItem" @cancel="showRegister = false"></register-dialog>
  <delete-dialog :show="showDelete" :item="item!!" @save="saveDeleteItem" @cancel="showDelete = false"></delete-dialog>

</template>

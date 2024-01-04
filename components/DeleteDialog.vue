<script setup lang="ts">
import { deleteItem } from '~/api/fludger';
import type { Item } from '~/types/types';

interface Props {
  show: boolean
  item: Item
}

const props = defineProps<Props>()

const emits = defineEmits<{
  save: [item: Item]
  cancel: []
}>()

const loading = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const message = ref<string>("");
const item = ref<Item>({ ...props.item })

watch(() => props.show, () => {
  if (props.show) {
    item.value.id = props.item.id;
    item.value.date = props.item.date;
    item.value.type = props.item.type;
    item.value.category1 = props.item.category1;
    item.value.category2 = props.item.category2;
    item.value.amount = props.item.amount;
    item.value.tags = props.item.tags;
    item.value.description = props.item.description;
  }
});

const save = async (item: Item) => {
  loading.value = true
  const response = await deleteItem(item.id);
  loading.value = false
  if (response.info !== null) {
    emits('save', item)
  } else {
    console.log(response);
    snackbar.value = true
    message.value = response.error ?? "削除に失敗しました"
  }
}

const cancel = () => {
  emits('cancel')
}

</script>

<template>
  <v-dialog v-model="props.show" scrollable>
    <v-card>
      <v-card-title>削除しますか？</v-card-title>
      <v-card-text>
          <v-btn @click="save(item)" :loading="loading">削除</v-btn>
          <v-btn @click="cancel()" :disabled="loading">キャンセル</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar" timeout="5000">{{ message }}</v-snackbar>

</template>

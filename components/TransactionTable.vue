<script setup lang="ts">
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

const sampleItems: Item[] = [
  {
    "id": "001",
    "date": "2023-09-02",
    "type": "支出",
    "category1": "食費",
    "category2": "食費",
    "amount": 5369,
    "tags": "",
    "description": ""
  },
  {
    "id": "002",
    "date": "2023-09-25",
    "type": "支出",
    "category1": "住宅",
    "category2": "光熱費",
    "amount": 8559,
    "tags": "",
    "description": ""
  },
  {
    "id": "003",
    "date": "2023-09-14",
    "type": "収入",
    "category1": "給与",
    "category2": "給与",
    "amount": 435522,
    "tags": "",
    "description": ""
  },
]

</script>

<template>
  <v-data-table :headers="headers" :sort-by="[{ key: 'date' }]" :items="sampleItems">
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

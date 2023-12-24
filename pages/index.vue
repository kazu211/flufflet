<script setup lang="ts">
import '~/utils/date-extensions';

const date = ref(new Date());
const dialog = ref(false);
const month = ref(date.value.ym())

const saveDate = () => {
  month.value = date.value.ym()
  dialog.value = false
}

const getColor = (type: string) => {
  if (type === '収入') return 'green'
  else if (type === '支出') return 'red'
  else return 'gray'
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

const sampleItems = [
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
  <v-card>
    <v-card-title>
      <v-dialog v-model="dialog" activator="parent">
        <template v-slot:activator="{ props }">
          <v-text-field
            color="primary"
            prepend-inner-icon="mdi-calendar"
            v-bind="props"
            v-model="month"
            readonly
          ></v-text-field>
        </template>

        <v-container>
          <v-date-picker v-model="date"></v-date-picker>
          <v-btn @click="dialog = false">キャンセル</v-btn>
          <v-btn @click="saveDate">選択</v-btn>
        </v-container>
      </v-dialog>
    </v-card-title>

    <v-data-table :headers="headers" :sort-by="[{ key: 'date' }]" :items="sampleItems">
      <template v-slot:item.type="{ value }">
        <v-chip :color="getColor(value)">
          {{ value }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

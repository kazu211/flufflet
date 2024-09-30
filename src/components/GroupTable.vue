<script setup lang="ts">

import type { Category, Item } from "~/types/types";

const props = defineProps<{
  items: Item[],
  categories: Category[],
}>()

const headers = [
  { title: 'カテゴリ1', value: 'category1', sortable: false },
  // { title: 'カテゴリ2', value: 'category2', sortable: false },
  { title: '金額', value: 'amount', sortable: true },
];

const getColor = (category1: string): string => {
  return props.categories.find(v => category1 == v.category1)?.color || "";
}

const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
}

const sumItems = (categories: Category[], items: Item[]): (Category & Partial<Item>)[] => {
  const categories1 = Object.fromEntries(categories.map(v => [v.category1, v]));

  const amounts = items.reduce((acc, item) => {
    if (!acc[item.category1]) {
      acc[item.category1] = 0;
    }
    acc[item.category1] += item.amount;
    return acc;
  }, {} as { [key: string]: number });

  return Object.values(categories1).map(v => {
    return {...v, amount: amounts[v.category1] || 0}
  });
};

const data = ref<(Category & Partial<Item>)[]>(sumItems(props.categories, props.items));

watch(() => props.items, () => {
  data.value = sumItems(props.categories, props.items);
});

</script>

<template>
  <!-- TODO: vuetify 3.7.0 にあげてヘッダーとフッターを非表示にする -->
  <v-data-table :headers="headers" :items="data">
    <template v-slot:item.category1="{ value }">
      <v-icon :color="getColor(value)">mdi-circle</v-icon> {{ value }}
    </template>
    <template v-slot:item.amount="{ value }">
      {{ formatAmount(value) }}
    </template>
  </v-data-table>
</template>

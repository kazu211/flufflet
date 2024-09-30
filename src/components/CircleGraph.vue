<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import type { Category, Item } from "~/types/types";

ChartJS.register(ArcElement, Title, Tooltip, Legend)

const props = defineProps<{
  items: Item[],
  categories: Category[],
}>()

const groupBy = (categories:Category[], items: Item[]): [ string[], number[], string[] ] => {
  const colors = Object.fromEntries(categories.map(v => [v.category1, v.color]));
  const amounts = Object.fromEntries(categories.map(v => [v.category1, 0]));

  items.forEach(item => {
    amounts[item.category1] += item.amount
  });

  return [Object.keys(amounts), Object.values(amounts), Object.values(colors)]
};

const [labels, amounts, colors] = groupBy(props.categories, props.items);
const data = ref<ChartData<'doughnut'>>({
  labels: labels,
  datasets: [
    {
      backgroundColor: colors,
      data: amounts
    }
  ]
})

watch(() => props.items, () => {
  const [labels, amounts, colors] = groupBy(props.categories, props.items);
    data.value = {
    labels: labels,
    datasets: [
      {
        backgroundColor: colors,
        data: amounts
      }
    ]
  }
});

const options:ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <Doughnut :data="data" :options="options"/>
</template>

<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import type { Item } from "~/types/types";

ChartJS.register(ArcElement, Title, Tooltip, Legend)

const props = defineProps<{
  items: Item[],
}>()

// FIXME: カテゴリが増えた場合の対応
const colors = [
  "#41B883", // ソフトグリーン
  "#E46651", // ミディアムコーラル
  "#00D8FF", // スカイブルー
  "#FFDD57", // ミディアムゴールド
  "#FF9F68", // ペールオレンジ
  "#A8E6CF", // ライトミント
  "#5C8D89"  // グレーグリーン
]

const groupBy = (items: Item[]): [ string[], number[] ] => {
  const group = items.reduce((acc, item) => {
    if (acc[item.category1]) {
      acc[item.category1] += item.amount;
    } else {
      acc[item.category1] = item.amount;
    }
    return acc;
  }, {} as { [key: string]: number });

  return [Object.keys(group), Object.values(group)]
};

const [labels, amounts] = groupBy(props.items);
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
  const [labels, amounts] = groupBy(props.items);
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

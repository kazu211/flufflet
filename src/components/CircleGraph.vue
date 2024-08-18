<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Title, Tooltip, Legend)

const data:ChartData<'doughnut'> = {
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [20, 40, 50, 10]
    }
  ]
}

const options:ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <Doughnut :data="data" :options="options"/>
</template>

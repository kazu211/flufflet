<script setup lang="ts">
import '~/utils/date-extensions';

const date = ref(new Date());
const month = ref(date.value.ym());
const title = ref(date.value.ymj());

const addMonth = (i: number) => {
  date.value.setMonth(date.value.getMonth() + i)
  month.value = date.value.ym()
  title.value = date.value.ymj()
}

</script>

<template>
  <v-card>
    <v-card-title>
      <div class="d-flex align-center justify-center">
        <v-btn icon="mdi-chevron-left" elevation="0" @click="addMonth(-1)"></v-btn>
        <v-spacer></v-spacer>
        {{title}}
        <v-spacer></v-spacer>
        <v-btn icon="mdi-chevron-right" elevation="0" @click="addMonth(1)"></v-btn>
      </div>
    </v-card-title>

    <v-card-text>
      <monthly-table :month="month"></monthly-table>
    </v-card-text>
  </v-card>
</template>

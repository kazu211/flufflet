<script setup lang="ts">
import '~/utils/date-extensions';
import { useLoginUser } from "~/composables/states";
import type { Item } from "~/types/types";

const { categories, getItems } = useLoginUser()

const date = ref(new Date());
const month = ref(date.value.ym());
const title = ref(date.value.ymj());
const items = ref<Item[]>([]);

const addMonth = (i: number) => {
  date.value.setMonth(date.value.getMonth() + i)
  month.value = date.value.ym()
  title.value = date.value.ymj()
}

onMounted(async () => {
  // loading.value = true;
  const { year, month } = date.value.ymo();
  items.value = await getItems(year, month);
  // loading.value = false;
});

watch(() => date, async () => {
  // loading.value = true;
  const { year, month } = date.value.ymo();
  items.value = await getItems(year, month);
  // loading.value = false;
});

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

    <v-row>
      <v-col>
        <v-card elevation="0">
          <v-card-title>支出</v-card-title>
          <v-card-text>
            <circle-graph></circle-graph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card elevation="0">
          <v-card-title>収入</v-card-title>
          <v-card-text>bbb</v-card-text>
        </v-card>
      </v-col>
    </v-row>
      <v-card elevation="0">
        <v-card-title>年間収支</v-card-title>
        <v-card-text>ccc</v-card-text>
      </v-card>
  </v-card>
</template>

<style scoped>

</style>

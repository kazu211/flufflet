<script setup lang="ts">
import '~/utils/date-extensions';

const date = ref(new Date());
const dialog = ref(false);
const month = ref(date.value.ym());

const saveDate = () => {
  month.value = date.value.ym()
  dialog.value = false
}

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

    <monthly-table :month="month"></monthly-table>
  </v-card>
</template>

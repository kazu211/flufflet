<template>
  <v-container>
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
  </v-container>
</template>

<script>
  export default {
    data() {
      const date = new Date()

      return {
        dialog: false,
        month: `${date.getFullYear()}-${('0' +(date.getMonth() + 1)).slice(-2)}`,
        date: date,
      }
    },
    methods: {
      saveDate() {
        this.month = `${this.date.getFullYear()}-${('0' +(this.date.getMonth() + 1)).slice(-2)}`
        this.dialog = false
      },
    },
  }
</script>

<script setup lang="ts">

const user = useLoginUser()

</script>

<template>
  <v-app>
    <v-app-bar scroll-behavior="hide" color="primary">
      <v-toolbar-title class="title">Flufflet</v-toolbar-title>
      <template v-slot:append v-if="user.auth">
        <v-btn @click="navigateTo('/')" icon="mdi-table"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

</v-app>
</template>

<style scoped>
.title {
  color: #38302E;
  font-size: 30px;
  font-family: cursive;
  font-weight: bold;
}
</style>

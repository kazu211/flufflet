<template>
  <v-app>
    <v-app-bar scroll-behavior="hide" color="primary">
      <v-toolbar-title class="title">Flufflet</v-toolbar-title>
      <template v-slot:append>
        <v-btn @click="navigateTo('/')" icon="mdi-table"></v-btn>
        <v-btn @click="navigateTo('/settings')" icon="mdi-cog"></v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

</v-app>
</template>

<script>
export default {
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.title {
  color: #38302E;
  font-size: 30px;
  font-family: cursive;
  font-weight: bold;
}
</style>

<script setup lang="ts">
import { useLoginUser } from '@/composables/states';

const user = useLoginUser()

const visible = ref(false);
const id = ref('');
const token = ref('');
const loading = ref(false);
const snackbar = ref(false);
const message = ref("");

onMounted(() => {
  id.value = user.id
  token.value = user.token
})

const save = async () => {
  loading.value = true
  await user.setUser(id.value, token.value)
  loading.value = false

  if (!user.auth) {
    snackbar.value = true
    message.value = "サインインに失敗しました"
  }
}

const required = (v: string): boolean | string => {
  return !!v || "必須項目です"
}
</script>

<template>
  <v-card class="mx-auto px-6 py-6" max-width="400">
    <v-card-text>
      <v-text-field
        v-model="id"
        :readonly="loading"
        :rules="[required]"
        placeholder="UserId"
        prepend-inner-icon="mdi-account"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="token"
        :readonly="loading"
        :rules="[required]"
        placeholder="token"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn
        :loading="loading"
        block
        class="mb-8"
        color="info"
        size="large"
        variant="tonal"
        @click="save"
      >
        サインイン
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-snackbar v-model="snackbar" timeout="5000">{{ message }}</v-snackbar>

</template>

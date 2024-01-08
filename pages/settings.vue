<script setup lang="ts">
import { useLoginUser } from '@/composables/states';

const user = useLoginUser()

const visible = ref(false);
const id = ref('');
const token = ref('');

onMounted(() => {
  id.value = user.id
  token.value = user.token
})

const onClickSave = () => {
  // TODO 疎通確認処理を実装する
  user.setUser(id.value, token.value)
}
</script>

<template>
  <v-card class="mx-auto px-6 py-6" max-width="400">
    <v-card-title>設定</v-card-title>

    <v-card-text>
      <v-text-field
        v-model="id"
        placeholder="UserId"
        prepend-inner-icon="mdi-account"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="token"
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
        block
        class="mb-8"
        color="info"
        size="large"
        variant="tonal"
        @click="onClickSave"
      >
        保存
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { postItem, putItem } from '~/api/fludger';
import { type Item } from '~/types/types';

interface Props {
  show: boolean
  item?: Item
}

const props = withDefaults(defineProps<Props>(), {
  item: () => ({
    id: "",
    date: "",
    type: "支出",
    category1: "",
    category2: "",
    amount: 0,
    tags: "",
    description: ""
  })
})

const emits = defineEmits<{
  save: [item: Item]
  cancel: []
}>()

const loading = ref<boolean>(false);
const snackbar = ref<boolean>(false);
const message = ref<string>("");
const item = ref<Item>({ ...props.item })

watch(() => props.show, () => {
  if (props.show) {
    item.value.id = props.item.id;
    item.value.date = props.item.date;
    item.value.type = props.item.type;
    item.value.category1 = props.item.category1;
    item.value.category2 = props.item.category2;
    item.value.amount = props.item.amount;
    item.value.tags = props.item.tags;
    item.value.description = props.item.description;
  }
});

const save = async (item: Item) => {
  loading.value = true
  // id の有無で新規/更新を判定する
  const response = props.item.id === "" ? await postItem(item) : await putItem(item);
  loading.value = false
  if ('id' in response) {
    emits('save', response)
  } else {
    console.log(response);
    snackbar.value = true
    message.value = response.error ?? "保存に失敗しました"
  }
}

const cancel = () => {
  emits('cancel')
}

// TODO 入力ルールを作る
const isNumber = (value: any): boolean | string => {
  const pattern = /^([1-9]\d*|0)$/;
  return pattern.test(value) || "0以上の数字を入力してください";
}

</script>

<template>
  <v-dialog v-model="props.show" scrollable>
    <v-card>
      <v-card-title>{{ item.id === "" ? "データ入力" : "データ編集" }}</v-card-title>
      <v-card-text>
        <v-form>
          <v-btn-toggle v-model="item.type" color="primary">
            <v-btn value="支出">支出</v-btn>
            <v-btn value="収入">収入</v-btn>
          </v-btn-toggle>

          <v-text-field v-model="item.amount" :rules="[isNumber]" label="金額" prefix="￥"></v-text-field>

          <v-text-field v-model="item.date" color="primary" prepend-inner-icon="mdi-calendar"></v-text-field>

          <v-text-field v-model="item.category1" color="primary" label="カテゴリー1"></v-text-field>
          <v-text-field v-model="item.category2" color="primary" label="カテゴリー2"></v-text-field>

          <v-text-field v-model="item.tags" color="primary" label="タグ"></v-text-field>

          <v-text-field v-model="item.description" color="primary" label="メモ"></v-text-field>

          <v-btn @click="save(item)" :loading="loading">保存</v-btn>
          <v-btn @click="cancel()" :disabled="loading">キャンセル</v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="snackbar" timeout="5000">{{ message }}</v-snackbar>

</template>

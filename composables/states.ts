import { Fludger } from "~/api/fludger"
import type { Category, DeleteItemsResponse, GetItemsResponse, Item, Month, PostItemsResponse, PutItemsResponse, Year } from "~/types/types"

export const useLoginUser = defineStore('user', () => {
  const id = ref('')
  const token = ref('')
  const api = ref(Fludger.create(id.value, token.value))
  const auth = ref(false)
  const categories = ref<Category[]>()

  const setUser = async (userId: string, userToken: string) => {
    id.value = userId
    token.value = userToken
    api.value = Fludger.create(userId, userToken)
    auth.value = await api.value.authenticate()

    if (auth.value) {
      categories.value = await api.value.getCategories()
      navigateTo('/')
    }
  }

  const getItems = async (year: Year, month?: Month): Promise<GetItemsResponse> => {
    return api.value.getItem(year, month)
  }

  const postItem = async (item: Item): Promise<PostItemsResponse> => {
    return api.value.postItem(item)
  }

  const deleteItem = async (item: Item): Promise<DeleteItemsResponse> => {
    return api.value.deleteItem(item)
  }

  const putItem = async (item: Item): Promise<PutItemsResponse> => {
    return api.value.putItem(item)
  }

  return { id, token, auth, categories, setUser, getItems, postItem, deleteItem, putItem }
})

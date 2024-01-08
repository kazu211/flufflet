import { Fludger } from "~/api/fludger"
import type { DeleteResponse, GetResponse, Id, Item, Month, PostResponse, PutResponse, Year } from "~/types/types"

export const useLoginUser = defineStore('user', () => {
  const id = ref('')
  const token = ref('')
  const api = ref(Fludger.create(id.value, token.value))
  const enabled = ref(false)

  const setUser = (userId: string, userToken: string) => {
    id.value = userId
    token.value = userToken
    api.value = Fludger.create(userId, userToken)
  }

  const getItems = async (year: Year, month?: Month): Promise<GetResponse> => {
    return api.value.getItem(year, month)
  }

  const postItem = async (item: Item): Promise<PostResponse> => {
    return api.value.postItem(item)
  }

  const deleteItem = async (id: Id): Promise<DeleteResponse> => {
    return api.value.deleteItem(id)
  }

  const putItem = async (item: Item): Promise<PutResponse> => {
    return api.value.putItem(item)
  }

  return { id, token, setUser, getItems, postItem, deleteItem, putItem }
})

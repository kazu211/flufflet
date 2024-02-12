import axios from 'axios';
import type { DeleteItemsResponse, GetCategoriesResponse, GetItemsResponse, Item, Month, PostItemsResponse, PutItemsResponse, Year } from '~/types/types';

export class Fludger {
  url: string;
  token: string;

  constructor(url: string, token: string) {
    this.url = url
    this.token = token
  }

  static create(id: string, token: string): Fludger {
    return new Fludger(`https://script.google.com/macros/s/${id}/exec`, token)
  }

  async authenticate(): Promise<boolean> {
    // TODO 認証用のpathをちゃんと作る
    try {
      const response = await axios.post<GetCategoriesResponse>(
        this.url,
        `{"method":"GET","path":"/categories","authToken":"${this.token}"}`,
        { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
      )
      return response.data.length >= 0
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async getCategories(): Promise<GetCategoriesResponse> {
    const response = await axios.post<GetCategoriesResponse>(
      this.url,
      `{"method":"GET","path":"/categories","authToken":"${this.token}"}`,
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
    )
    return response.data
  }

  async getItem(year: Year, month?: Month): Promise<GetItemsResponse> {
    const response = await axios.post<GetItemsResponse>(
      this.url,
      `{"method":"GET","path":"/items","authToken":"${this.token}","params":{"year":"${year}","month":"${month}"}}`,
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
    )
    return response.data
  }

  async postItem(item: Item): Promise<PostItemsResponse> {
    const { id, date, type, category1, category2, amount, description } = item;
    const response = await axios.post<PostItemsResponse>(
      this.url,
      `{"method":"POST","path":"/items","authToken":"${this.token}","params":{"item":{"id":"${id}","date":"${date}","type":"${type}","category1":"${category1}","category2":"${category2}","amount":${amount},"description":"${description}"}}}`,
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
    )
    return response.data
  }

  async deleteItem(item: Item): Promise<DeleteItemsResponse> {
    const { id, date, type, category1, category2, amount, description } = item;
    const response = await axios.post<DeleteItemsResponse>(
      this.url,
      `{"method":"DELETE","path":"/items","authToken":"${this.token}","params":{"item":{"id":"${id}","date":"${date}","type":"${type}","category1":"${category1}","category2":"${category2}","amount":${amount},"description":"${description}"}}}`,
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
    )
    return response.data
  }

  async putItem(item: Item): Promise<PutItemsResponse> {
    const { id, date, type, category1, category2, amount, description } = item;
    const response = await axios.post<PutItemsResponse>(
      this.url,
      `{"method":"PUT","path":"/items","authToken":"${this.token}","params":{"item":{"id":"${id}","date":"${date}","type":"${type}","category1":"${category1}","category2":"${category2}","amount":${amount},"description":"${description}"}}}`
    )
    return response.data
  }
}

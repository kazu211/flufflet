import axios from 'axios';
import type { DeleteResponse, GetResponse, Id, Item, Month, PostResponse, PutResponse, Year } from '~/types/types';

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

  async getItem(year: Year, month?: Month): Promise<GetResponse> {
    const response = await axios.post<GetResponse>(
      this.url,
      `{"method":"GET","authToken":"${this.token}","params":{"year":"${year}","month":"${month}"}}`,
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
    )
    return response.data
  }

  async postItem(item: Item): Promise<PostResponse> {
    const { id, date, type, category1, category2, amount, tags, description } = item;
    const response = await axios.post<PostResponse>(
      this.url,
      `{"method":"POST","authToken":"${this.token}","params":{"item":{"id":"${id}","date":"${date}","type":"${type}","category1":"${category1}","category2":"${category2}","amount":${amount},"tags":"${tags}","description":"${description}"}}}`,
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
    )
    return response.data
  }

  async deleteItem(id: Id): Promise<DeleteResponse> {
    const response = await axios.post<DeleteResponse>(
      this.url,
      `{"method":"DELETE","authToken":"${this.token}","params":{"id":"${id}"}}`,
      { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
    )
    return response.data
  }

  async putItem(item: Item): Promise<PutResponse> {
    const { id, date, type, category1, category2, amount, tags, description } = item;
    const response = await axios.post<PutResponse>(
      this.url,
      `{"method":"PUT","authToken":"${this.token}","params":{"item":{"id":"${id}","date":"${date}","type":"${type}","category1":"${category1}","category2":"${category2}","amount":${amount},"tags":"${tags}","description":"${description}"}}}`
    )
    return response.data
  }
}

import axios from 'axios';
import type { DeleteResponse, GetResponse, Id, Item, PostResponse, PutResponse } from '~/types/types';

const fludger = axios.create({
  baseURL: 'https://script.google.com/macros/s/xxxxx/exec',
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

const token = 'xxxxx'

export const getItems = async (year: string, month?: string): Promise<GetResponse> => {
  const response = await fludger.post<GetResponse>(
    '',
    `{"method":"GET","authToken":"${token}","params":{"year":"${year}","month":"${month}"}}`
  )
  return response.data;
};

export const postItem = async (item: Item): Promise<PostResponse> => {
  const { id, date, type, category1, category2, amount, tags, description } = item;
  const response = await fludger.post<PostResponse>(
    '',
    `{"method":"POST","authToken":"${token}","params":{"item":{"id":"${id}","date":"${date}","type":"${type}","category1":"${category1}","category2":"${category2}","amount":${amount},"tags":"${tags}","description":"${description}"}}}`
  )
  return response.data
}

export const deleteItem = async (id: Id): Promise<DeleteResponse> => {
  const response = await fludger.post<DeleteResponse>(
    '',
    `{"method":"DELETE","authToken":"${token}","params":{"id":"${id}"}}`
  )
  return response.data
}

export const putItem = async (item: Item): Promise<PutResponse> => {
  const { id, date, type, category1, category2, amount, tags, description } = item;
  const response = await fludger.post<PutResponse>(
    '',
    `{"method":"PUT","authToken":"${token}","params":{"item":{"id":"${id}","date":"${date}","type":"${type}","category1":"${category1}","category2":"${category2}","amount":${amount},"tags":"${tags}","description":"${description}"}}}`
  )
  return response.data
}

import axios from 'axios';

const fludger = axios.create({
  baseURL: 'https://script.google.com/macros/s/xxxxx/exec',
  headers: { 'content-type': 'application/x-www-form-urlencoded' }
});

const token = 'xxxxx'

export const getItems = async (year: string, month?: string) => {
  const response = await fludger.post(
    '',
    `{"method":"GET","authToken":"${token}","params":{"year":"${year}","month":"${month}"}}`
  )
  return response.data;
};

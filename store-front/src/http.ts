import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://app:3000/api',
});

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STORE_API_URL,
});

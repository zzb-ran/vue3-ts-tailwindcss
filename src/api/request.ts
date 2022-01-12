import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HOST_BASE_URL,
  timeout: 2000
});

const { get, post } = instance;

export {
  get,
  post
};
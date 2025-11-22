import axios from 'axios';

export const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const api = axios.create({ baseURL: API_URL });

export async function getUsers() {
  const { data } = await api.get('/');
  return data;
}

export async function createUser(user) {
  const { data } = await api.post('/', user);
  return data;
}

export async function updateUser(id, user) {
  const { data } = await api.put(`/${id}`, user);
  return data;
}

export async function deleteUser(id) {
  await api.delete(`/${id}`);
  return true;
}
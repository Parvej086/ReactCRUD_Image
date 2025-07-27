import axios from 'axios';
const api = axios.create({ baseURL: 'https://localhost:7225/api/Products' });

export const fetchProducts = () => api.get('/');
export const uploadProduct = (prod, file) => {
  const form = new FormData();
  form.append('name', prod.name);
  form.append('price', prod.price);
  form.append('image', file);
  return api.post('/', form, { headers: {'Content-Type': 'multipart/form-data'} });
};
export const updateProduct = (id, prod, file) => {
  const form = new FormData();
  form.append('name', prod.name);
  form.append('price', prod.price);
  if (file) form.append('image', file);
  return api.put(`/${id}`, form, { headers: {'Content-Type': 'multipart/form-data'} });
};
export const deleteProduct = id => api.delete(`/${id}`);

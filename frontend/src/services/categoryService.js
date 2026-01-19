import httpClient from "./httpClient";

const API_URL = "/api/v1/books/categories";

export const getCategories = () => httpClient.get(API_URL);

export const getCategoryById = (id) => httpClient.get(`${API_URL}/${id}`);

export const createCategory = (category) => httpClient.post(API_URL, category);

export const updateCategory = (id, category) =>
  httpClient.put(`${API_URL}/${id}`, category);

export const deleteCategory = (id) => httpClient.delete(`${API_URL}/${id}`);

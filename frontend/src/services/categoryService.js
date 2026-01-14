import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/books/categories";

export const getCategories = () => axios.get(API_URL);

export const createCategory = (category) => axios.post(API_URL, category);

export const updateCategory = (id, category) =>
  axios.put(`${API_URL}/${id}`, category);

export const deleteCategory = (id) => axios.delete(`${API_URL}/${id}`);

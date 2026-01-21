import httpClient from "../api/httpClient.js";

const API_URL = "/api/v1/books";

export const getBooks = (filters = {}) =>
  httpClient.get(API_URL, { params: filters });

export const getBook = (id) => httpClient.get(`${API_URL}/${id}`);

export const createBook = (book) => httpClient.post(API_URL, book);

export const updateBook = (id, book) =>
  httpClient.put(`${API_URL}/${id}`, book);

export const deleteBook = (id) => httpClient.delete(`${API_URL}/${id}`);

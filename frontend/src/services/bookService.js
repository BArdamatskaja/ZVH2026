import axios from "axios";
import httpClient from "./httpClient";
const API_URL = "/api/v1/books";

export const getBooks = (filters = {}) => httpClient.get(API_URL, {params: filters});

export const getBook = (id) => httpClient.get(`${API_URL}/${id}`);

export const createBook = (books) => httpClient.post(API_URL, books);

export const updateBook = (id, books) => httpClient.put(`${API_URL}/${id}`, books);

export const deleteBook = (id) => httpClient.delete(`${API_URL}/${id}`);

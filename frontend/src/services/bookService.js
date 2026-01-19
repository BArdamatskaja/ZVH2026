import axios from "axios";
const API_URL = "http://localhost:8080/api/v1/books";

export const getBooks = () => axios.get(API_URL);

export const getBook = (id) => axios.get(`${API_URL}/${id}`);

export const createBook = (books) => axios.post(API_URL, books);

export const updateBook = (id, books) => axios.put(`${API_URL}/${id}`, books);

export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);

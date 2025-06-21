import { Book, BookCreate, ReviewCreate } from '@/types';

// Use relative URLs that will be proxied through Next.js API routes
const API_BASE_URL = '/api';

export const api = {
  // Get all books
  async getBooks(): Promise<Book[]> {
    const response = await fetch(`${API_BASE_URL}/books`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return response.json();
  },

  // Add a new book
  async addBook(book: BookCreate): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    if (!response.ok) {
      throw new Error('Failed to add book');
    }
    return response.json();
  },

  // Get a specific book
  async getBook(id: string): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch book');
    }
    return response.json();
  },

  // Add a review to a book
  async addReview(bookId: string, review: ReviewCreate): Promise<Book> {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });
    if (!response.ok) {
      throw new Error('Failed to add review');
    }
    return response.json();
  },
}; 
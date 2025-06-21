export interface Review {
  rating: number;
  comment: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  reviews: Review[];
}

export interface BookCreate {
  title: string;
  author: string;
  genre: string;
}

export interface ReviewCreate {
  rating: number;
  comment: string;
} 
'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Star, MessageSquare } from 'lucide-react';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New book form state
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
  });
  const [showNewBookForm, setShowNewBookForm] = useState(false);
  
  // Review form state
  const [reviewForm, setReviewForm] = useState<{
    [bookId: string]: { rating: number; comment: string; show: boolean };
  }>({});

  // Fetch books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const fetchedBooks = await api.getBooks();
      setBooks(fetchedBooks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedBook = await api.addBook(newBook);
      setBooks([...books, addedBook]);
      setNewBook({ title: '', author: '', genre: '' });
      setShowNewBookForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to add book');
      console.error('Error adding book:', err);
    }
  };

  const handleAddReview = async (bookId: string) => {
    const review = reviewForm[bookId];
    if (!review || review.rating === 0) return;

    try {
      const updatedBook = await api.addReview(bookId, {
        rating: review.rating,
        comment: review.comment,
      });
      
      setBooks(books.map(book => 
        book.id === bookId ? updatedBook : book
      ));
      
      setReviewForm(prev => ({
        ...prev,
        [bookId]: { rating: 0, comment: '', show: false }
      }));
      setError(null);
    } catch (err) {
      setError('Failed to add review');
      console.error('Error adding review:', err);
    }
  };

  const toggleReviewForm = (bookId: string) => {
    setReviewForm(prev => ({
      ...prev,
      [bookId]: {
        rating: 0,
        comment: '',
        show: !prev[bookId]?.show
      }
    }));
  };

  const updateReviewForm = (bookId: string, field: 'rating' | 'comment', value: string | number) => {
    setReviewForm(prev => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: value
      }
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Amazon Books</h1>
          <p className="text-gray-600">Discover and review your favorite books</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Add New Book Button */}
        <div className="mb-6">
          <Button
            onClick={() => setShowNewBookForm(!showNewBookForm)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {showNewBookForm ? 'Cancel' : 'Add New Book'}
          </Button>
        </div>

        {/* New Book Form */}
        {showNewBookForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add New Book</CardTitle>
              <CardDescription>Enter the details of the book you want to add</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddBook} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newBook.title}
                      onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                      placeholder="Enter book title"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      placeholder="Enter author name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Select
                      value={newBook.genre}
                      onValueChange={(value) => setNewBook({ ...newBook, genre: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fiction">Fiction</SelectItem>
                        <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                        <SelectItem value="Mystery">Mystery</SelectItem>
                        <SelectItem value="Romance">Romance</SelectItem>
                        <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                        <SelectItem value="Fantasy">Fantasy</SelectItem>
                        <SelectItem value="Biography">Biography</SelectItem>
                        <SelectItem value="History">History</SelectItem>
                        <SelectItem value="Self-Help">Self-Help</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  Add Book
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Books List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <Card key={book.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{book.title}</CardTitle>
                <CardDescription>
                  by {book.author} • {book.genre}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Reviews Summary */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {book.reviews.length} review{book.reviews.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  {book.reviews.length > 0 && (
                    <div className="flex items-center gap-1">
                      {renderStars(
                        Math.round(
                          book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* Reviews List */}
                {book.reviews.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Reviews:</h4>
                    {book.reviews.map((review, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center gap-2 mb-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-600">({review.rating}/5)</span>
                        </div>
                        <p className="text-sm text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Review Button */}
                <Button
                  variant="outline"
                  onClick={() => toggleReviewForm(book.id)}
                  className="w-full"
                >
                  {reviewForm[book.id]?.show ? 'Cancel Review' : 'Add Review'}
                </Button>

                {/* Review Form */}
                {reviewForm[book.id]?.show && (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-md">
                    <div>
                      <Label htmlFor={`rating-${book.id}`}>Rating</Label>
                      <Select
                        value={reviewForm[book.id]?.rating.toString() || ''}
                        onValueChange={(value) => updateReviewForm(book.id, 'rating', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <SelectItem key={rating} value={rating.toString()}>
                              {rating} Star{rating !== 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`comment-${book.id}`}>Comment</Label>
                      <Textarea
                        id={`comment-${book.id}`}
                        value={reviewForm[book.id]?.comment || ''}
                        onChange={(e) => updateReviewForm(book.id, 'comment', e.target.value)}
                        placeholder="Write your review..."
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={() => handleAddReview(book.id)}
                      disabled={!reviewForm[book.id]?.rating || !reviewForm[book.id]?.comment}
                      className="w-full"
                    >
                      Submit Review
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {books.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageSquare className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first book!</p>
            <Button onClick={() => setShowNewBookForm(true)}>
              Add Your First Book
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 
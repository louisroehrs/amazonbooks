from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime

app = FastAPI(title="Amazon Books API", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class Review(BaseModel):
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")
    comment: str = Field(..., min_length=1, max_length=1000, description="Review comment")

class Book(BaseModel):
    id: str
    title: str = Field(..., min_length=1, max_length=200, description="Book title")
    author: str = Field(..., min_length=1, max_length=100, description="Book author")
    genre: str = Field(..., min_length=1, max_length=50, description="Book genre")
    reviews: List[Review] = []

class BookCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, description="Book title")
    author: str = Field(..., min_length=1, max_length=100, description="Book author")
    genre: str = Field(..., min_length=1, max_length=50, description="Book genre")

class ReviewCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5, description="Rating from 1 to 5")
    comment: str = Field(..., min_length=1, max_length=1000, description="Review comment")

# In-memory storage
books_db: dict[str, Book] = {}

@app.get("/")
async def root():
    return {"message": "Welcome to Amazon Books API"}

@app.get("/books", response_model=List[Book])
async def get_books():
    """Get a list of all books"""
    return list(books_db.values())

@app.post("/books", response_model=Book)
async def add_book(book: BookCreate):
    """Add a new book"""
    book_id = str(uuid.uuid4())
    new_book = Book(
        id=book_id,
        title=book.title,
        author=book.author,
        genre=book.genre,
        reviews=[]
    )
    books_db[book_id] = new_book
    return new_book

@app.get("/books/{book_id}", response_model=Book)
async def get_book(book_id: str):
    """Get a specific book by ID"""
    if book_id not in books_db:
        raise HTTPException(status_code=404, detail="Book not found")
    return books_db[book_id]

@app.post("/books/{book_id}/reviews", response_model=Book)
async def add_review(book_id: str, review: ReviewCreate):
    """Add a review to a specific book"""
    if book_id not in books_db:
        raise HTTPException(status_code=404, detail="Book not found")
    
    new_review = Review(rating=review.rating, comment=review.comment)
    books_db[book_id].reviews.append(new_review)
    return books_db[book_id]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 
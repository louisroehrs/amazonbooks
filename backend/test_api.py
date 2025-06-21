import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    print("Testing Amazon Books API...\n")
    
    # Test 1: Add a book
    print("1. Adding a new book...")
    book_data = {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction"
    }
    response = requests.post(f"{BASE_URL}/books", json=book_data)
    if response.status_code == 200:
        book = response.json()
        book_id = book["id"]
        print(f"   Book added successfully! ID: {book_id}")
        print(f"   Title: {book['title']}")
        print(f"   Author: {book['author']}")
        print(f"   Genre: {book['genre']}")
    else:
        print(f"   Error adding book: {response.status_code}")
        return
    
    print()
    
    # Test 2: Add another book
    print("2. Adding another book...")
    book_data2 = {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Fiction"
    }
    response = requests.post(f"{BASE_URL}/books", json=book_data2)
    if response.status_code == 200:
        book2 = response.json()
        book2_id = book2["id"]
        print(f"   Book added successfully! ID: {book2_id}")
        print(f"   Title: {book2['title']}")
    else:
        print(f"   Error adding book: {response.status_code}")
    
    print()
    
    # Test 3: Get all books
    print("3. Getting all books...")
    response = requests.get(f"{BASE_URL}/books")
    if response.status_code == 200:
        books = response.json()
        print(f"   Found {len(books)} books:")
        for book in books:
            print(f"   - {book['title']} by {book['author']} ({book['genre']})")
    else:
        print(f"   Error getting books: {response.status_code}")
    
    print()
    
    # Test 4: Add a review to the first book
    print("4. Adding a review to the first book...")
    review_data = {
        "rating": 5,
        "comment": "A masterpiece of American literature. The prose is beautiful and the story is timeless."
    }
    response = requests.post(f"{BASE_URL}/books/{book_id}/reviews", json=review_data)
    if response.status_code == 200:
        updated_book = response.json()
        print(f"   Review added successfully!")
        print(f"   Book now has {len(updated_book['reviews'])} review(s)")
        for review in updated_book['reviews']:
            print(f"   - Rating: {review['rating']}/5, Comment: {review['comment']}")
    else:
        print(f"   Error adding review: {response.status_code}")
    
    print()
    
    # Test 5: Add another review
    print("5. Adding another review...")
    review_data2 = {
        "rating": 4,
        "comment": "Great story about the American Dream. Very well written."
    }
    response = requests.post(f"{BASE_URL}/books/{book_id}/reviews", json=review_data2)
    if response.status_code == 200:
        updated_book = response.json()
        print(f"   Review added successfully!")
        print(f"   Book now has {len(updated_book['reviews'])} review(s)")
    else:
        print(f"   Error adding review: {response.status_code}")
    
    print()
    
    # Test 6: Get the specific book with reviews
    print("6. Getting the specific book with all reviews...")
    response = requests.get(f"{BASE_URL}/books/{book_id}")
    if response.status_code == 200:
        book = response.json()
        print(f"   Book: {book['title']} by {book['author']}")
        print(f"   Genre: {book['genre']}")
        print(f"   Reviews ({len(book['reviews'])}):")
        for i, review in enumerate(book['reviews'], 1):
            print(f"   {i}. Rating: {review['rating']}/5 - {review['comment']}")
    else:
        print(f"   Error getting book: {response.status_code}")

if __name__ == "__main__":
    try:
        test_api()
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the API. Make sure the server is running on http://localhost:8000")
    except Exception as e:
        print(f"Error: {e}") 
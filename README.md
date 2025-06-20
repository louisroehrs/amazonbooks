# Amazon Books API

A FastAPI application for managing books and reviews with in-memory storage.

## Features

- Get a list of all books
- Add a new book
- Get a specific book by ID
- Add reviews to books
- CORS enabled for frontend integration
- Input validation with Pydantic models

## Local Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the application:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## Deployment

### Option 1: Railway (Recommended)

1. Go to [Railway](https://railway.app/) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select this repository
4. Railway will automatically detect the Python app and deploy it
5. Your app will be available at a URL like: `https://your-app-name.railway.app`

### Option 2: Render

1. Go to [Render](https://render.com/) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub account and select this repository
4. Configure:
   - **Name**: `amazon-books-api`
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click "Create Web Service"
6. Your app will be available at: `https://your-app-name.onrender.com`

### Option 3: Heroku

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login to Heroku:
```bash
heroku login
```

3. Create a new Heroku app:
```bash
heroku create your-app-name
```

4. Deploy:
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

5. Your app will be available at: `https://your-app-name.herokuapp.com`

## API Endpoints

### GET /books
Get a list of all books

### POST /books
Add a new book
```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction"
}
```

### GET /books/{book_id}
Get a specific book by ID

### POST /books/{book_id}/reviews
Add a review to a specific book
```json
{
  "rating": 5,
  "comment": "Excellent book! Highly recommended."
}
```

## Data Models

### Book
- `id`: Unique identifier (auto-generated)
- `title`: Book title (1-200 characters)
- `author`: Book author (1-100 characters)
- `genre`: Book genre (1-50 characters)
- `reviews`: List of reviews

### Review
- `rating`: Rating from 1 to 5
- `comment`: Review comment (1-1000 characters)

## Interactive Documentation

Once the server is running, you can access:
- Interactive API documentation: `http://localhost:8000/docs`
- Alternative documentation: `http://localhost:8000/redoc`

## Testing

Run the test script to verify the API functionality:
```bash
python test_api.py # amazonbooks

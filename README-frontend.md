# Amazon Books Frontend

A beautiful React/Next.js frontend for the Amazon Books API, built with Tailwind CSS and shadcn/ui.

## Features

- 📚 Display list of books with reviews
- ➕ Add new books with title, author, and genre
- ⭐ Add reviews with ratings (1-5 stars) and comments
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔄 Real-time updates when adding books/reviews
- 📱 Mobile-friendly design

## Prerequisites

Make sure you have the FastAPI backend running on `http://localhost:8000` (or set the `NEXT_PUBLIC_API_URL` environment variable).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       └── textarea.tsx
├── lib/
│   ├── api.ts               # API service functions
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript type definitions
└── package.json
```

## API Integration

The frontend communicates with the FastAPI backend through the `lib/api.ts` service, which provides:

- `getBooks()` - Fetch all books
- `addBook(book)` - Add a new book
- `getBook(id)` - Get a specific book
- `addReview(bookId, review)` - Add a review to a book

## Features in Detail

### Book Management
- Add new books with title, author, and genre selection
- View all books in a responsive grid layout
- Each book card shows title, author, genre, and review count

### Review System
- Add reviews with 1-5 star ratings
- Write detailed comments for each review
- View all reviews for each book
- See average rating with star display

### User Experience
- Loading states and error handling
- Form validation and user feedback
- Responsive design for all screen sizes
- Smooth animations and transitions

## Deployment

To deploy the frontend:

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred platform (Vercel, Netlify, etc.)

3. Set the `NEXT_PUBLIC_API_URL` environment variable to point to your deployed backend.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request 
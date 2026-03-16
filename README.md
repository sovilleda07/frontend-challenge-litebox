# Litebox Frontend Challenge - Blog Application

A modern, responsive blog application built with React, TypeScript, and Tailwind CSS. This project allows users to browse posts, filter by topics, view post details with markdown support, and create new posts.

## Live Demo

- **Frontend**: https://tu-url.netlify.app
- **Backend API**: https://dev-sonia-daniela-villeda-guerra-backend.onrender.com

## Tech Stack

- **React 19**: Latest version of React for building the user interface.
- **TypeScript**: Ensuring type safety across the application.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS 4**: Modern styling with the latest Tailwind features.
- **React Router 7**: Declarative routing for navigation.
- **Axios**: Handling API requests to the backend.
- **React Markdown**: Rendering blog post content from markdown.
- **React Icons**: Using Phosphor and FontAwesome icons for a premium feel.

## Key Features

- **Hero Section**: Highlights the most recent featured post.
- **Topic Filtering**: Easily filter posts by categories like "Technology", "Design", "Lifestyle", etc.
- **Interactive Post Grid**: Clean and responsive layout for browsing blog posts.
- **"Most Viewed" Sidebar**: Quick access to popular content.
- **Post Detail View**: Full-page view for reading posts with markdown formatting.
- **Related Posts**: Suggests similar content based on the current post.
- **New Post Creation**: Modal-based interface for adding new blog entries.
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens.

## Project Structure

```bash
src/
├── assets/         # Static assets like images and fonts
├── components/     # Reusable UI components
│   ├── home/       # Home page specific components
│   ├── layout/     # Common layout items (Navbar, Footer)
│   ├── modal/      # Modal components for interactions
│   ├── post/       # Post-related components
│   └── ui/         # Base UI primitives
├── hooks/          # Custom React hooks for logic reuse
├── pages/          # Full page components (Home, Post Detail)
├── services/       # API interaction logic
├── types/          # TypeScript definitions and interfaces
└── index.css       # Global styles and Tailwind configuration
```

## Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd dev-sonia-daniela-villeda-guerra-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory based on `.env.example`:

   ```env
   VITE_API_URL=your_backend_api_url
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run preview`: Locally preview the production build.

---

Developed as part of the Litebox Frontend Challenge.

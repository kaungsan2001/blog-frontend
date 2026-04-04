# Blog Frontend

This is a modern, responsive React frontend application built for a blog platform, featuring a rich text editor, authentication, user profiles, a comprehensive admin dashboard and many more features.

## Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Routing**: React Router
- **Data Fetching / Caching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod
- **Authentication**: Better Auth
- **HTTP Client**: Axios
- **Rich Text Editor**: React Quill New
- **Image Handling**: Cloudinary

## Project Structure

```text
src/
├── components/   # Reusable, core UI components (e.g., shadcn/ui primitives)
├── features/     # Encapsulated feature modules
│   ├── admin/    # Dashboard, user/blog/admin/category management
│   ├── auth/     # Sign-in and sign-up flows
│   ├── blog/     # Feed, blog editor, blog details, search, saved articles
│   └── user/     # Profiles, settings, user list, user search, follower/following
├── hooks/        # Global custom hooks
├── layouts/      # Page layout wrappers (AdminLayout, AuthLayout, GuestLayout)
├── lib/          # Shared utilities and configurations (Axios, cn, etc.)
└── providers/    # Global context providers (AuthProvider)
```

## Setup & Installation

1. **Install Dependencies**

   ```bash
   bun install
   ```

2. **Environment Configuration**
   Ensure an `.env` file exists in the root directory containing necessary environment variables

   ```env
   VITE_API_BASE_URL=http://localhost:8000
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CALLBACK_URL=http://localhost:5173/
   ```

3. **Development Server**
   To start the Vite development server:

   ```bash
   bun run dev
   ```

   The application will be accessible at `http://localhost:5173` locally.

4. **Build & Preview**
   ```bash
   bun run build
   bun run preview
   ```

## Key Features

- **Robust Authentication**: Seamless and secure sign-in and sign-up logic interacting with Better Auth.
- **Content Creation**: A full-featured editor (React Quill New) allowing rich text formatting and cover image uploads via Cloudinary.
- **Admin Dashboard**: Specialized administrative layouts and tools to moderate content and manage the platform's users and categories.
- **Social Capabilities**: Users can view other user profiles, manage their saved articles, and follow/unfollow content creators.
- **Polished UI/UX**: Built with React 19, tailwindcss v4, and highly accessible shadcn/ui components (support for dark mode included via `next-themes`).

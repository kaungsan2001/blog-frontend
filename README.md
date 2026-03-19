# React Starter Boilerplate

A modern, fast, and feature-rich React boilerplate designed for beginner projects. It provides everything you need to start building scalable react applications immediately.

## 🚀 Tech Stack

This boilerplate is powered by the latest and greatest in the React ecosystem:

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/) - Lightning fast HMR and optimized builds
- **Routing**: [React Router v7](https://reactrouter.com/) - Declarative routing
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **Components**: [Shadcn UI](https://ui.shadcn.com/) - Beautifully designed, accessible, and customizable components
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) - Performant, flexible schemas and validation
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) (React Query) - Powerful asynchronous state management
- **Icons**: [Lucide React](https://lucide.dev/) & Phosphor Icons
- **Theming**: `next-themes` - Built-in dark/light mode toggle
- **Compiler Optimizations**: `babel-plugin-react-compiler` included

## 📦 Features out of the Box

- ✅ **Responsive Layouts**: Pre-configured `HomeLayout` and `AuthLayout` with mobile-friendly sidebars and headers.
- ✅ **Authentication Ready**: Includes pre-styled, validated `SignIn` and `SignUp` forms using `Zod` and `react-hook-form`.
- ✅ **Dark Mode Support**: Seamless dark/light mode integration out of the box.
- ✅ **Component Library**: Foundational UI components (Buttons, Inputs, Cards, Forms, Dropdowns) are already set up via Shadcn UI.
- ✅ **Strict Typing**: Fully TypeScript configured.

## 🛠️ Getting Started

### Prerequisites

Make sure you have bun installed.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install the dependencies:

   ```bash
   bun install
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── ui/              # Shadcn UI primitives (Button, Input, Card, etc.)
│   └── web/             # Application-specific or complex components (Header, Sidebar, Forms)
├── layouts/             # Page layouts (e.g., HomeLayout, AuthLayout)
├── lib/                 # Utility functions (e.g., tailwind merge `cn`)
├── pages/               # Route components / Pages
├── zod/                 # Zod validation schemas
├── App.tsx              # Main application entry point / Router configuration
└── main.tsx             # React DOM rendering
```

## 📝 Available Scripts

- `bun run dev`: Starts the development server using Vite.
- `bun run build`: Compiles TypeScript and builds the app for production.
- `bun run lint`: Lints the codebase using ESLint.
- `bun run preview`: Bootstraps a local web server that serves the production build.

## 🤝 Contributing

This boilerplate is designed to be a starting point. Feel free to modify, expand, or strip down anything you don't need for your specific project!

## 📄 License

This project is licensed under the MIT License - feel free to use it for whatever you want!

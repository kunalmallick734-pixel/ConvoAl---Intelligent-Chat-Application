# AI Chatbot

A ChatGPT-style AI chatbot built with **Next.js 15**, featuring real-time AI responses, conversation history, markdown rendering, authentication, and shareable chats.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Auth**: Clerk
- **State Management**: Redux Toolkit + Zustand
- **UI**: Radix UI, Tailwind CSS v4, Framer Motion
- **Markdown**: react-markdown with syntax highlighting, math (KaTeX), and GFM

## Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account for authentication

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory (or copy `.env.example`):

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini API Key
GOOGLE_API_KEY=your_gemini_api_key_here
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- 💬 Real-time AI chat with streaming responses
- 🔐 Authentication via Clerk
- 📝 Markdown rendering with syntax highlighting & math support
- 🔗 Shareable chat links
- 🗂️ Conversation history & management
- 🌙 Dark mode UI
- 📱 Responsive layout with sidebar

## Project Structure

```
app/          # Next.js App Router pages
components/   # UI components (sidebar, messages, input, etc.)
hooks/        # Custom React hooks
lib/          # Utility functions and AI helpers
state/        # Redux store and API slices
public/       # Static assets
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

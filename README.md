<div align="center">

# ⚡ Convo AI — Next-Gen Conversational Intelligence

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.7_Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk)](https://clerk.com/)

<p align="center">
  A state-of-the-art, full-stack AI Conversational platform with real-time streaming, chat history, multi-model fallback, mathematical notation rendering, and user authentication.
</p>

</div>

---

## 🌟 Key Features

- ⚡ **Real-Time Streaming Responses**: High-throughput SSE streaming powered by Google's latest Gemini models.
- 🛡️ **Intelligent Model Fallback**: Built-in multi-model failover (`gemini-3.1-flash-lite`, `gemini-3.7-flash`, etc.) ensuring zero downtime.
- 🔐 **Secure Authentication**: Frictionless user login, signup, and user management via **Clerk**.
- 📝 **Rich Markdown & Math**: Syntax-highlighted code blocks, tables, GFM support, and **KaTeX** mathematical formulas.
- 💬 **Conversation Management**: Create, edit, search, and delete chat threads with automated title generation.
- 🔗 **Shareable Chats**: Generate public preview links to share AI conversations instantly.
- 🌓 **Theme Support**: Sleek, customizable dark and light mode with fluid micro-animations.
- 📱 **Adaptive UI**: Responsive sidebar drawer designed for seamless desktop and mobile experiences.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router & Server Components) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v4, Radix UI Primitives, Lucide Icons |
| **Animations** | Framer Motion & CSS transitions |
| **AI Integration** | Google Generative AI SDK (`@google/generative-ai`) |
| **State Management** | Redux Toolkit (RTK Query) + Zustand |
| **Auth & Security** | Clerk Next.js SDK |
| **Markdown & Math** | `react-markdown`, `remark-gfm`, `remark-math`, `rehype-katex` |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.18+ or later
- **npm** or **yarn** or **pnpm**
- A [Google AI Studio API Key](https://aistudio.google.com/app/apikey)
- A free [Clerk Account](https://dashboard.clerk.com)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/convo-ai.git
cd convo-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables Configuration
Create a `.env.local` file in the root directory:

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google Gemini API Key
GOOGLE_API_KEY=AIzaSy...
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```text
├── app/
│   ├── api/
│   │   ├── chat/         # Streaming AI API route (Gemini SSE)
│   │   └── graphql/      # Chat history and message mutations
│   ├── chat/[chatId]/    # Dynamic chat view
│   ├── share/[id]/       # Public shareable chat view
│   ├── sign-in/          # Clerk Sign-In route
│   ├── sign-up/          # Clerk Sign-Up route
│   ├── globals.css       # Global design tokens and theme variables
│   ├── layout.tsx        # Root layout & Metadata
│   └── page.tsx          # Landing / Initial chat screen
├── components/
│   ├── AI-Assistant/     # Core chatbot components (Header, Messages, Input, Sidebar)
│   ├── Icons/            # Custom SVG icon set
│   ├── Multipurpose/     # Reusable buttons, modals, dropdowns
│   └── ui/               # Radix UI primitives & shadcn components
├── hooks/                # Custom React hooks (mobile detection, theme)
├── lib/                  # Helper utilities (title generation, message helpers)
├── state/                # Redux store, global slices, and RTK Query API
└── public/               # Static assets, branding, and animations
```

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts local development server on `http://localhost:3000` |
| `npm run build` | Compiles optimized production bundle |
| `npm run start` | Runs the production build |
| `npm run lint` | Runs ESLint analysis for code quality |

---

## 🛡️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <b>Developed by Kunal Mallick</b> • Built with Next.js & Google Gemini
</div>

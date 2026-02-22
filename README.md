https://stride-goals.vercel.app/

# 🚀 Stride: The Gamified Goal Tracker

**Stride** is a full-stack, "sticker-book" inspired productivity application designed to make goal tracking feel less like a chore and more like a creative project. Built with **React** and **Supabase**, it features a vibrant, pop-art UI with a robust PostgreSQL backend.

## ✨ Key Features

* **Social Authentication:** Secure login via GitHub OAuth.
* **Sticker-Style UI:** A unique, non-corporate design featuring tilted task "stickers" and a dot-grid canvas.
* **Real-time Data:** Instant task updates powered by Supabase.
* **Secure Data Isolation:** Custom Row Level Security (RLS) policies ensure users can only access their own data.
* **Responsive Layout:** A "Sticker Storm" background that adapts to fill the screen on desktop.

## 🛠️ The Tech Stack

* **Frontend:** React.js (Vite)
* **Backend/Database:** Supabase (PostgreSQL)
* **Authentication:** GitHub OAuth 2.0
* **Deployment:** Vercel (CI/CD)

## 🧠 Technical Challenges Overcome

### 1. Database Security (RLS)

I implemented strict **Row Level Security** policies to prevent data leakage between users. This ensures that even though all tasks live in one table, a user's `auth.uid()` must match the `user_id` of the row to view or edit it.

### 2. Modern Authentication Flow

Integrated GitHub as an OAuth provider, managing session persistence and user metadata to display personalized greetings (e.g., pulling the user's first name from GitHub profiles).

### 3. Procedural UI Design

Used JavaScript logic within CSS-in-JS to randomly rotate task elements on the fly, giving the app a "manually placed" scrapbook aesthetic.

---

## 🚀 How to Run it Locally

1. **Clone the repo:**
```bash
git clone https://github.com/YOUR_USERNAME/stride-app.git

```


2. **Install dependencies:**
```bash
npm install

```


3. **Set up your environment variables:**
Create a `.env` file and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here

```


4. **Launch:**
```bash
npm run dev

```



---



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

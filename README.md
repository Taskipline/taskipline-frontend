# Taskipline - Frontend

> A discipline-focused productivity platform that unifies tasks, calendar, notes, and goals—powered by AI, gamification, and a customizable experience designed for web and mobile.

This repository contains the frontend for the Taskipline application, built with Next.js and Tailwind CSS.

---

## ✨ Key Features

- **Unified Dashboard**: View your tasks, calendar events, and goals all in one place.
- **Task Management**: Create, organize, and track your daily tasks.
- **Calendar Integration**: Sync your schedule and never miss an appointment.
- **Note Taking**: A dedicated space for your thoughts, ideas, and meeting notes.
- **Goal Tracking**: Set long-term goals and monitor your progress.
- **Responsive Design**: A seamless experience on both desktop and mobile devices with a collapsible sidebar that supports swipe gestures.
- **Customizable UI**: Includes a dark/light mode toggle.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14 (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: Custom-built, inspired by shadcn/ui
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Taskipline/taskipline-frontend.git
    cd taskipline-frontend
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a file named `.env.local` in the root of your project and add the following line, pointing it to your backend API:

    ```env
    NEXT_PUBLIC_TASKIPLINE_API=http://localhost:5000/api/v1
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Creates a production-ready build of the application.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

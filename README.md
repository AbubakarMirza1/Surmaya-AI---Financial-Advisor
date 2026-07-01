# Surmaya — AI-Powered Personal Finance Tracker

## What It Does

Surmaya helps you track income and expenses, visualize spending patterns, and receive AI-generated financial analysis and recommendations tailored for Pakistan. The app provides actionable insights, goal tracking, and an interactive AI advisor for personalized guidance.

## The Problem It Solves

Young professionals in Pakistan lack accessible, intelligent tools to understand their own financial health. Surmaya makes this simple.

## Tech Stack

- **Frontend:** React (with Vite)
- **AI Integration:** Gemini API (`@google/genai`)
- **Charts:** Recharts
- **TypeScript**
- **Tailwind CSS** (via class usage)
- **Font Awesome** (icons)

## Features

- Income and expense tracking with categories
- Visual spending breakdown by category (pie chart)
- Savings and goal tracking with progress bars
- Loans tracker (given/taken, due dates, status)
- AI-powered financial advisor chat (contextual, Pakistani market-aware)
- Contextual AI advice overlay on every screen
- Quick prompts for common queries (e.g., Zakat, tax slabs)
- Responsive, mobile-friendly UI

## Screenshots

Screenshots coming soon

## Getting Started

**Prerequisites:** Node.js

1. Clone the repository.
2. Install dependencies:
   ```
   npm install
   ```
3. Obtain a Gemini API key from the Gemini developer portal.
4. Create a `.env.local` file in the project root and add:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
5. Run the app:
   ```
   npm run dev
   ```

## Future Roadmap

- Bank statement PDF upload with AI analysis
- Spending category breakdown with charts
- Budget goal setting and alerts
- Multi-currency support

# OS Tracker | Open Source Contribution Tracker

A lightning-fast, high-contrast web application designed to visualize and track developer contributions across the open-source ecosystem. Built with a focus on premium aesthetics and flawless scrolling performance.

## 🚀 Features

- **High-Contrast Modern UI**: A bold, editorial aesthetic featuring pure black, neon green, and stark white blocky components with massive border-radii (`40px`).
- **120Hz Smooth Scrolling**: Engineered for performance. Leverages modern CSS capabilities like `content-visibility: auto`, `contain-intrinsic-size`, and GPU-accelerated `translate3d` transforms to guarantee buttery-smooth scrolling, even when rendering hundreds of repository cards.
- **Local Search History**: Automatically persists your 5 most recent GitHub profile searches to your browser's local storage for instantaneous access on return.
- **Accessible & Dynamic Content**: Text dynamically inherits high-contrast colors depending on the component's background. Repository descriptions and names are engineered to never break out of their containers using strict `overflow-wrap: anywhere`.
- **Deep Linking**: Clickable usernames and repository tags seamlessly redirect to live GitHub profiles and project pages.
- **Engaging Landing State**: An interactive "Empty State" featuring trending open-source maintainers and a 3-step usage guide.

## 🛠️ Tech Stack

- **Frontend Framework**: React (Bootstrapped via Vite)
- **Styling**: Vanilla CSS Modules (Zero-dependency, handcrafted design tokens)
- **Data Fetching**: Axios
- **State Management**: React `useState` & `useEffect` hooks + `localStorage` API

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
You must also have the **OS Tracker Backend** server running locally on port `5001`.

### Installation & Execution

1. Navigate to the frontend directory:
   ```bash
   cd os-tracker-frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

## 🎨 Design Philosophy
The application deliberately shies away from standard flat or glassmorphic designs, opting instead for a heavy, blocky, and aggressively high-contrast styling. This mimics high-end portfolio platforms (e.g., Wix Studio, Framer) and prioritizes readability and user impact above all else.

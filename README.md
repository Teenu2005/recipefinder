# 🍴 CookBook – Discover, Cook & Enjoy

> **CookBook** is a modern recipe web app built with **React**.  
> It helps users discover global recipes, get AI-powered explanations, toggle between dark and light themes, and save their favorite dishes — all in one elegant interface.

---

## 🧭 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Author](#author)
- [License](#license)

---

## 📖 Overview

**CookBook** brings the world’s cuisines to your screen.  
Users can browse recipes by country or category, view detailed cooking steps, and even ask an **AI assistant** to explain a dish in their own language.

The app is simple, fast, and fun — perfect for beginners and cooking enthusiasts alike.

---

## ⚙️ Key Features

### 🌗 Dark / Light Mode
Easily toggle between light and dark themes for a customized experience.

### 🧠 AI Helper Integration
Uses **Google Gemini AI** to explain any recipe in a friendly and simplified tone.  
Supports multiple languages like English, Tamil, Hindi, Malayalam, and Telugu.

### ❤️ Favorite Recipes
Users can save recipes to their **Favorites**, stored locally using browser **Local Storage**.

### 🎲 Random Dish Generator
Tap the **“Surprise Me!”** button to discover a random recipe instantly.

### 🍽️ Detailed Recipe View
Each recipe page shows:
- Step-by-step instructions  
- Ingredients with measurements  
- Recipe origin and category  
- YouTube tutorial link  

### 📱 Responsive Design
Built with **React Bootstrap** for a clean and responsive interface across all screen sizes.

---

## 💻 Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React, React Bootstrap |
| API | [TheMealDB](https://www.themealdb.com/api.php) |
| AI | Gemini 1.5 Flash (Google Generative Language API) |
| Storage | Local Storage |
| Styling | CSS / Bootstrap |
| Deployment | GitHub Pages / Vercel (optional) |

---

## ⚙️ Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/cookbook.git
cd cookbook

### 2️⃣ Install Dependencies
npm install

3️⃣ Create .env File

Create a .env file in the root folder and add your Gemini API key:

VITE_GEMINI_API_KEY=your_api_key_here

4️⃣ Start the Development Server
npm run dev

5️⃣ Build for Production
npm run build

🌿 Project Structure
CookBook/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Categories.jsx
│   │   ├── Favourite.jsx
│   │   ├── Detail.jsx
│   │   └── AiHelper.jsx
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
└── package.json
🧩 Components Overview
1. Navbar.jsx

Displays app title and navigation links (Home, Categories, Favorites).

Contains Dark/Light Mode Toggle button.

2. Home.jsx

Displays a hero section with the tagline and call to action.

Shows country and category cards (e.g., “American”, “Canadian”).

Includes “Surprise Me!” button to load a random dish.

3. Categories.jsx

Fetches and displays recipes by selected category.

Each dish card includes a thumbnail and name with a “View Details” button.

4. Detail.jsx

Fetches a recipe by its id using TheMealDB API.

Displays:

Recipe image

Instructions (split line by line)

Ingredients with measurements

YouTube video link

Includes AI Explain button that opens AiHelper component.

5. AiHelper.jsx

Uses Gemini AI to explain the selected recipe in user’s chosen language.

Displays output inside a card.

Shows a loading spinner during API calls.

6. Favourite.jsx

Displays user’s saved favorite recipes stored in Local Storage.

Allows users to remove items from favorites.

7. Footer.jsx

Displays footer with links, contact info, and developer credit.

Example:

👨‍💻 Author

Teenu Anand P
📧 teenuanand@gmail.com
CookBook © 2025. Bringing flavors to your fingertips.
Designed by Teenu Anand.

Data Source:
Recipes and meal information are fetched from TheMealDB
, a free and open public API for developers.